import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiUploadImage } from "services/AuthService";
import { apiCreateCategory } from "services/HomeService";

export const createCategory = createAsyncThunk(
    "settings/data/createCategory",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiCreateCategory(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const uploadImage = createAsyncThunk(
    "settings/data/uploadImage",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiUploadImage(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: 'settings/data',
    initialState: {
        creatingCategory: false,
        uploading: false,
        uploadStatus: 'idle',
    },
    reducers: {
        setUploadStatus: (state, action) => {
            state.uploadStatus = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.creatingCategory = true
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.creatingCategory = false
            })
            .addCase(createCategory.rejected, (state) => {
                state.creatingCategory = false
            })

            .addCase(uploadImage.pending, (state) => {
                state.uploading = true;
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.uploading = false;
                state.uploadStatus = action.payload.status
            })
            .addCase(uploadImage.rejected, (state) => {
                state.uploading = false;
                state.uploadStatus = 'error'
            })
    }
})

export const {
    setUploadStatus,
} = dataSlice.actions

export default dataSlice.reducer