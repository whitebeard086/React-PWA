import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetRequestsData } from "services/RequestsService";

export const getRequestsData = createAsyncThunk(
    "requests/data/getRequestsData",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetRequestsData(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
    {
        condition: (data, { getState }) => {
            const { requests } = getState();
            if (requests.loading) {
                return false;
            }
        },
    }
);

const dataSlice = createSlice({
    name: "requests/data",
    initialState: {
        bookings: [],
        enquiries: [],
        status: "idle",
        loading: false,
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRequestsData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRequestsData.fulfilled, (state, action) => {
                state.loading = false;
                const { status, enquiries, bookings } = action.payload;
                state.status = status;
                state.enquiries = enquiries;
                state.bookings = bookings;
            })
            .addCase(getRequestsData.rejected, (state) => {
                state.loading = false;
                state.status = "error";
            });
    },
});

export const { setStatus } = dataSlice.actions;
export default dataSlice.reducer;
