import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUploadBanner } from "services/AuthService";

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

const dataSlice = createSlice({
    name: 'profile/data',
    initialState: {
        uploadStatus: 'idle',
        uploading: false,
    },
    reducers: {
        setUploadStatus: (state, action) => {
            state.uploadStatus = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadBanner.pending, (state) => {
                state.uploading = true;
            })
            .addCase(uploadBanner.fulfilled, (state, action) => {
                state.uploading = false;
                state.uploadStatus = action.payload.status
            })
            .addCase(uploadBanner.rejected, (state) => {
                state.uploading = false;
                state.uploadStatus = 'error'
            })
    }
})

export const {
    setUploadStatus,
} = dataSlice.actions

export default dataSlice.reducer