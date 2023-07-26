import { apiGetDashboardData } from "services/DashboardService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiCompleteService, apiConfirmService } from "services/BookingService";


export const getDashboardData = createAsyncThunk(
    "dashboard/data/getDashboardData",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetDashboardData(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
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

export const confirmService = createAsyncThunk(
    "payments/data/confirmService",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiConfirmService(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: 'dashboard/data',
    initialState: {
        loading: false,
        enquiries: [],
        bookings: [],
        booking: {},
        bookingsCount: null,
        completingService: false,
        confirmingStatus: false,
        serviceCompleted: false,
        serviceConfirmed: false,
        status: 'idle',
        serviceStatus: 'idle',
        confirmStatus: 'idle',
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setBooking: (state, action) => {
            state.booking = action.payload;
        },
        setServiceStatus: (state, action) => {
            state.serviceStatus =  action.payload;
        },
        setConfirmStatus: (state, action) => {
            state.confirmStatus = action.payload;
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
            .addCase(getDashboardData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                const { status, enquiries, bookingsCount, bookings } = action.payload;
                state.status = status;
                state.enquiries = enquiries;
                state.bookingsCount = bookingsCount;
                state.bookings = bookings;
            })
            .addCase(getDashboardData.rejected, (state) => {
                state.loading = false;
                state.status = 'error';
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
                state.serviceStatus = action.payload.status
            })

            .addCase(confirmService.pending, (state) => {
                state.confirmingService = true
            })
            .addCase(confirmService.fulfilled, (state, action) => {
                state.confirmingService = false
                const { status, booking } = action.payload;
                state.confirmStatus = status;
                state.booking = booking;
            })
            .addCase(confirmService.rejected, (state, action) => {
                state.confirmingService = false
                state.confirmStatus = action.payload.status
            })
    }
})

export const {
    setStatus,
    setBooking,
    setServiceStatus,
    setServiceCompleted,
    setServiceConfirmed, 
} = dataSlice.actions

export default dataSlice.reducer