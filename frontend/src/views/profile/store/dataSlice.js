import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    apiGetProvider,
    apiUpdateProfileView,
    apiUploadBanner,
} from "@/services/AuthService";

export const uploadBanner = createAsyncThunk(
    "profile/data/uploadBanner",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiUploadBanner(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getProvider = createAsyncThunk(
    "profile/data/getProvider",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetProvider(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProfileView = createAsyncThunk(
    "profile/data/updateProfileView",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiUpdateProfileView(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: "profile/data",
    initialState: {
        uploadStatus: "idle",
        uploading: false,
        gettingProvider: false,
        provider: {},
        service: {},
        workdays: {},
        providerStatus: "idle",
    },
    reducers: {
        setUploadStatus: (state, action) => {
            state.uploadStatus = action.payload;
        },
        setProviderStatus: (state, action) => {
            state.providerStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadBanner.pending, (state) => {
                state.uploading = true;
            })
            .addCase(uploadBanner.fulfilled, (state, action) => {
                state.uploading = false;
                state.uploadStatus = action.payload.status;
            })
            .addCase(uploadBanner.rejected, (state) => {
                state.uploading = false;
                state.uploadStatus = "error";
            })

            .addCase(getProvider.pending, (state) => {
                state.gettingProvider = true;
            })
            .addCase(getProvider.fulfilled, (state, action) => {
                state.gettingProvider = false;
                state.providerStatus = action.payload.status;
                state.provider = action.payload.provider;
                state.service = action.payload.provider.service;
                state.workdays = action.payload.provider.service.workdays;
            })
            .addCase(getProvider.rejected, (state) => {
                state.gettingProvider = false;
                state.providerStatus = "error";
            });
    },
});

export const { setUploadStatus, setProviderStatus } = dataSlice.actions;

export default dataSlice.reducer;
