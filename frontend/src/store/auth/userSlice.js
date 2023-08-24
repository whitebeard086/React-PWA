import { apiGetUser } from "@/services/AuthService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
    "auth/data/getUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetUser(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const initialState = {
    profile: {},
    onlineUsers: [],
    userType: "",
    hasPin: false,
    hasVisited: false,
    hasService: null,
    userSet: null,
    gettingUser: false,
    verifiedPhone: null,
    verifyingDeposits: false,
    enabledNotifications: false,
};

export const userSlice = createSlice({
    name: "auth/user",
    initialState,
    reducers: {
        setUser: (_, action) => action.payload,
        updateUser: (state, action) => {
            state = { ...state, ...action.payload };
        },
        setHasVisited: (state, action) => {
            state.hasVisited = action.payload;
        },
        userLoggedOut: () => initialState,
        setVerifyingDeposits: (state, action) => {
            state.verifyingDeposits = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setEnabledNotifications: (state, action) => {
            state.enabledNotifications = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.gettingUser = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.gettingUser = false;
                const { user, hasPin } = action.payload;
                state.profile = user;
                state.hasPin = hasPin;
                state.userType = user.profile_type.name

                if (user.phone_verified_at === null) {
                    state.verifiedPhone = false
                } else if (user.phone_verified_at !== null) {
                    state.verifiedPhone = true
                }

                if (user.service === null) {
                    state.hasService = false
                } else if (user.service) {
                    state.hasService = true
                }
            })
            .addCase(getUser.rejected, (state) => {
                state.gettingUser = false;
            })
    },
});

export const { 
    setUser, 
    updateUser, 
    setHasVisited, 
    userLoggedOut,
    setOnlineUsers,
    setVerifyingDeposits,
    setEnabledNotifications,
} = userSlice.actions;

export default userSlice.reducer;
