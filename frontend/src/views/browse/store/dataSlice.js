import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetBrowseData, apiGetCategory } from "services/BrowseService";

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

const dataSlice = createSlice({
    name: 'browse/data',
    initialState: {
        loading: false,
        gettingCategory: false,
        categories: [],
        services: [],
        category: {},
        status: 'idle',
        categoryStatus: 'idle',
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBrowseData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBrowseData.fulfilled, (state, action) => {
                state.loading = false;
                state.status = action.payload.status;
                state.categories = action.payload.categories;
                // state.services = action.payload.services;
            })
            .addCase(getBrowseData.rejected, (state) => {
                state.loading = false;
                state.status = 'error';
            })

            .addCase(getCategory.pending, (state) => {
                state.gettingCategory = true;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.gettingCategory = false;
                state.categoryStatus = action.payload.status;
                state.category = action.payload.category;
                state.services = action.payload.category.services;
            })
            .addCase(getCategory.rejected, (state) => {
                state.gettingCategory = false;
                state.categoryStatus = 'error';
            })
    }
})

export const {
    setStatus,
} = dataSlice.actions

export default dataSlice.reducer