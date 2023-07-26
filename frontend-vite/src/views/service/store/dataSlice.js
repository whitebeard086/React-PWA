import { apiCreateService, apiGetCategories, apiGetSubCategories, apiUpdateService } from "services/AuthService";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getCategories = createAsyncThunk(
    "service/data/getCategories",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetCategories(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getSubCategories = createAsyncThunk(
    "service/data/getSubCategories",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetSubCategories(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createService = createAsyncThunk(
    "service/data/createService",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiCreateService(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateService = createAsyncThunk(
    "service/data/updateService",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiUpdateService(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: 'service/data',
    initialState: {
        creatingService: false,
        loadingCategories: false,
        loadingSubCategories: false,
        categories: [],
        subCategories: [],
        countryStatus: 'idle',
        subCategoryStatus: 'idle',
        serviceStatus: 'idle',
    },
    reducers: {
        setServiceStatus: (state, action) => {
            state.serviceStatus = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loadingCategories = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loadingCategories = false;
                state.categories = action.payload.categories;
            })
            .addCase(getCategories.rejected, (state) => {
                state.loadingCategories = false;
            })

            .addCase(getSubCategories.pending, (state) => {
                state.loadingSubCategories = true;
            })
            .addCase(getSubCategories.fulfilled, (state, action) => {
                state.loadingSubCategories = false;
                state.subCategories = action.payload.subcategories;
            })
            .addCase(getSubCategories.rejected, (state) => {
                state.loadingSubCategories = false;
            })

            .addCase(createService.pending, (state) => {
                state.creatingService = true
            })
            .addCase(createService.fulfilled, (state) => {
                state.creatingService = false
                state.serviceStatus = 'success'
            })
            .addCase(createService.rejected, (state) => {
                state.creatingService = false
                state.serviceStatus = 'error'
            })

            .addCase(updateService.pending, (state) => {
                state.creatingService = true
            })
            .addCase(updateService.fulfilled, (state) => {
                state.creatingService = false
                state.serviceStatus = 'success'
            })
            .addCase(updateService.rejected, (state) => {
                state.creatingService = false
                state.serviceStatus = 'error'
            })
    }
})

export const {
    setServiceStatus,
} = dataSlice.actions;

export default dataSlice.reducer