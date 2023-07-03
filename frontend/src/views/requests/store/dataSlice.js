import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCompleteService, apiGetRequestsData } from "services/RequestsService";

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

export const completeService = createAsyncThunk(
    "payments/data/completeService",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiCompleteService(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: "requests/data",
    initialState: {
        bookings: [],
        enquiries: [],
        booking: {},
        serviceStatus: 'idle',
        status: "idle",
        completingService: false,
        serviceCompleted: false,
        serviceConfirmed: false,
        loading: false,
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setServiceStatus: (state, action) => {
            state.serviceStatus =  action.payload
        },
        setServiceCompleted: (state, action) => {
            state.serviceCompleted = action.payload;
        },
        setServiceConfirmed: (state, action) => {
            state.serviceConfirmed = action.payload;
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
            })

            .addCase(completeService.pending, (state) => {
                state.completingService = true
            })
            .addCase(completeService.fulfilled, (state, action) => {
                state.completingService = false
                const { status, booking } = action.payload;
                state.serviceStatus = status;
                state.booking = booking;
            })
            .addCase(completeService.rejected, (state, action) => {
                state.completingService = false
                state.status = action.payload.status
            })
    },
});

export const { 
    setStatus,
    setServiceStatus,
    setServiceCompleted,
    setServiceConfirmed, 
} = dataSlice.actions;
export default dataSlice.reducer;
