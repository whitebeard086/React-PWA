import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCheckEmail, apiCheckUser, apiGetProfileTypes } from "services/AuthService";

export const getProfileTypes = createAsyncThunk(
    "authentication/data/getProfileTypes",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetProfileTypes(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const checkUser = createAsyncThunk(
    "authentication/data/checkUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiCheckUser(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const checkEmail = createAsyncThunk(
    "authentication/data/checkEmail",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiCheckEmail(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: "authentication/data",
    initialState: {
        signupData: {},
        checkingUsername: false,
        usernameAvail: false,
        checkingEmail: false,
        emailAvail: false,
        status: 'idle',
        emailStatus: 'idle',
        statusMessage: "",
        emailStatusMessage: "",
        profileTypes: [],
        gettingProfileTypes: false,
    },
    reducers: {
        setSignupData: (state, action) => {
            state.signupData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfileTypes.pending, (state) => {
                state.gettingProfileTypes = true
            })
            .addCase(getProfileTypes.fulfilled, (state, action) => {
                state.gettingProfileTypes = false
                state.profileTypes = action.payload.profile_types
            })
            .addCase(getProfileTypes.rejected, (state) => {
                state.gettingProfileTypes = false
            })

            .addCase(checkUser.pending, (state) => {
                state.checkingUsername = true;
            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.checkingUsername = false;
                state.usernameAvail = true;
                state.status = action.payload.status;
                state.statusMessage = action.payload.message
            })
            .addCase(checkUser.rejected, (state, action) => {
                state.checkingUsername = false;
                state.usernameAvail = false;
                state.status = action.payload.status;
                state.statusMessage = action.payload.message
            })

            .addCase(checkEmail.pending, (state) => {
                state.checkingEmail = true;
            })
            .addCase(checkEmail.fulfilled, (state, action) => {
                state.checkingEmail = false;
                state.emailAvail = true;
                state.emailStatus = action.payload.status;
                state.emailStatusMessage = action.payload.message
            })
            .addCase(checkEmail.rejected, (state, action) => {
                state.checkingEmail = false;
                state.emailAvail = false;
                state.emailStatus = action.payload.status;
                state.emailStatusMessage = action.payload.message
            })
    }
}) 

export const {
    setSignupData,
} = dataSlice.actions;

export default dataSlice.reducer;