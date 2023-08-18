import { apiGetHomeData, apiGetHomeGuestData } from "@/services/HomeService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const getHomeGuestData = createAsyncThunk(
    "home/data/getHomeGuestData",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetHomeGuestData(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: "home/data",
    initialState: {
        loading: false,
        categories: [],
        services: [],
        bookings: [],
        status: "idle",
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHomeData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHomeData.fulfilled, (state, action) => {
                state.loading = false;
                const { status, categories, services, bookings } =
                    action.payload;
                state.status = status;
                state.categories = categories;
                state.services = services;
                state.bookings = bookings?.data;
            })
            .addCase(getHomeData.rejected, (state) => {
                state.loading = false;
                state.status = "error";
            })

            .addCase(getHomeGuestData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHomeGuestData.fulfilled, (state, action) => {
                state.loading = false;
                const { status, categories, services } = action.payload;
                state.status = status;
                state.categories = categories;
                state.services = services;
            })
            .addCase(getHomeGuestData.rejected, (state) => {
                state.loading = false;
                state.status = "error";
            });
    },
});

export const { setStatus } = dataSlice.actions;

export default dataSlice.reducer;
