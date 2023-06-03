import { apiGetHomeData } from "services/HomeService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getHomeData = createAsyncThunk(
    "home/data/getHomeData",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetHomeData(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: 'home/data',
    initialState: {
        loading: false,
        categories: [],
        services: [],
        status: 'idle',
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHomeData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHomeData.fulfilled, (state, action) => {
                state.loading = false;
                state.status = action.payload.status;
                state.categories = action.payload.categories;
                state.services = action.payload.services;
            })
            .addCase(getHomeData.rejected, (state) => {
                state.loading = false;
                state.status = 'error';
            })
    }
})

export const {
    setStatus,
} = dataSlice.actions

export default dataSlice.reducer