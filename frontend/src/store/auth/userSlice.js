import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetUser } from "services/AuthService";

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
    userType: "",
    hasVisited: false,
    hasService: null,
    userSet: null,
    gettingUser: false,
    verifiedPhone: null,
    verifyingDeposits: false,
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.gettingUser = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.gettingUser = false;
                state.profile = action.payload.user;
                state.userType = action.payload.user.profile_type.name

                if (action.payload.user.phone_verified_at === null) {
                    state.verifiedPhone = false
                } else if (action.payload.user.phone_verified_at !== null) {
                    state.verifiedPhone = true
                }

                if (action.payload.user.service === null) {
                    state.hasService = false
                } else if (action.payload.user.service) {
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
    setVerifyingDeposits,
} = userSlice.actions;

export default userSlice.reducer;
