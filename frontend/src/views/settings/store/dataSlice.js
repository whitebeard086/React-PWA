import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCancelDeleteAccount, apiDeleteAccount, apiUploadImage } from "@/services/AuthService";
import { apiGetBrowseData, apiGetCategory } from "@/services/BrowseService";
import { apiCreateCategory, apiUpdateCategory } from "@/services/HomeService";

export const getBrowseData = createAsyncThunk(
    "browse/data/getBrowseData",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetBrowseData(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

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

export const updateCategory = createAsyncThunk(
    "settings/data/updateCategory",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiUpdateCategory(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCategory = createAsyncThunk(
    "browse/data/getCategory",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetCategory(data);
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

export const deleteAccount = createAsyncThunk(
    "settings/data/deleteAccount",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiDeleteAccount(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const cancelDeleteAccount = createAsyncThunk(
    "settings/data/cancelDeleteAccount",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiCancelDeleteAccount(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: "settings/data",
    initialState: {
        gettingCategories: false,
        gettingCategory: false,
        creatingCategory: false,
        updatingCategory: false,
        uploading: false,
        deletingAccount: false,
        category: {},
        uploadStatus: "idle",
        deleteStatus: "idle",
    },
    reducers: {
        setUploadStatus: (state, action) => {
            state.uploadStatus = action.payload;
        },
        setDeleteStatus: (state, action) => {
            state.deleteStatus = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCategory.pending, (state) => {
                state.creatingCategory = true;
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.creatingCategory = false;
            })
            .addCase(createCategory.rejected, (state) => {
                state.creatingCategory = false;
            })

            .addCase(updateCategory.pending, (state) => {
                state.updatingCategory = true;
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.updatingCategory = false;
            })
            .addCase(updateCategory.rejected, (state) => {
                state.updatingCategory = false;
            })

            .addCase(getBrowseData.pending, (state) => {
                state.gettingCategories = true;
            })
            .addCase(getBrowseData.fulfilled, (state, action) => {
                state.gettingCategories = false;
                state.categories = action.payload.categories;
            })
            .addCase(getBrowseData.rejected, (state) => {
                state.gettingCategories = false;
            })

            .addCase(getCategory.pending, (state) => {
                state.gettingCategory = true;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.gettingCategory = false;
                state.category = action.payload.category;
            })
            .addCase(getCategory.rejected, (state) => {
                state.gettingCategory = false;
            })

            .addCase(uploadImage.pending, (state) => {
                state.uploading = true;
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.uploading = false;
                state.uploadStatus = action.payload.status;
            })
            .addCase(uploadImage.rejected, (state) => {
                state.uploading = false;
                state.uploadStatus = "error";
            })

            .addCase(deleteAccount.pending, (state) => {
                state.deletingAccount = true;
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.deletingAccount = false;
                const { status } = action.payload;
                state.deleteStatus = status;
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.deletingAccount = false;
                const { status } = action.payload;
                state.deleteStatus = status;
            })

            .addCase(cancelDeleteAccount.pending, (state) => {
                state.deletingAccount = true;
            })
            .addCase(cancelDeleteAccount.fulfilled, (state, action) => {
                state.deletingAccount = false;
                const { status } = action.payload;
                state.deleteStatus = status;
            })
            .addCase(cancelDeleteAccount.rejected, (state, action) => {
                state.deletingAccount = false;
                const { status } = action.payload;
                state.deleteStatus = status;
            })
    },
});

export const { 
    setUploadStatus, 
    setDeleteStatus, 
} = dataSlice.actions;

export default dataSlice.reducer;
