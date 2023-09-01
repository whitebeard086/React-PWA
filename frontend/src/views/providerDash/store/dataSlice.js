import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    apiCancelService,
    apiCompleteService,
    apiConfirmService,
    apiStartService,
} from "@/services/BookingService";
import { apiGetDashboardData } from "@/services/DashboardService";

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

export const startService = createAsyncThunk(
    "dashboard/data/startService",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiStartService(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const cancelService = createAsyncThunk(
    "dashboard/data/cancelService",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiCancelService(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const dataSlice = createSlice({
    name: "dashboard/data",
    initialState: {
        loading: false,
        enquiries: [],
        bookings: [],
        booking: {},
        bookingsCount: null,
        startingService: false,
        cancellingService: false,
        completingService: false,
        confirmingStatus: false,
        serviceStarted: false,
        serviceCancelled: false,
        serviceCompleted: false,
        serviceConfirmed: false,
        status: "idle",
        serviceStatus: "idle",
        confirmStatus: "idle",
        startStatus: "idle",
        cancelStatus: "idle",
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setBooking: (state, action) => {
            state.booking = action.payload;
        },
        setStartStatusDash: (state, action) => {
            state.startStatus = action.payload;
        },
        setCancelStatusDash: (state, action) => {
            state.cancelStatus = action.payload;
        },
        setServiceStatusDash: (state, action) => {
            state.serviceStatus = action.payload;
        },
        setConfirmStatusDash: (state, action) => {
            state.confirmStatus = action.payload;
        },
        setServiceStartedDash: (state, action) => {
            state.serviceStarted = action.payload;
        },
        setServiceCancelledDash: (state, action) => {
            state.serviceCancelled = action.payload;
        },
        setServiceCompletedDash: (state, action) => {
            state.serviceCompleted = action.payload;
        },
        setServiceConfirmedDash: (state, action) => {
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
                const { status, enquiries, bookingsCount, bookings } =
                    action.payload;
                state.status = status;
                state.enquiries = enquiries;
                state.bookingsCount = bookingsCount;
                state.bookings = bookings;
            })
            .addCase(getDashboardData.rejected, (state) => {
                state.loading = false;
                state.status = "error";
            })

            .addCase(completeService.pending, (state) => {
                state.completingService = true;
            })
            .addCase(completeService.fulfilled, (state, action) => {
                state.completingService = false;
                const { status, booking } = action.payload;
                state.serviceStatus = status;
                state.booking = booking;
            })
            .addCase(completeService.rejected, (state, action) => {
                state.completingService = false;
                state.serviceStatus = action.payload.status;
            })

            .addCase(confirmService.pending, (state) => {
                state.confirmingService = true;
            })
            .addCase(confirmService.fulfilled, (state, action) => {
                state.confirmingService = false;
                const { status, booking } = action.payload;
                state.confirmStatus = status;
                state.booking = booking;
            })
            .addCase(confirmService.rejected, (state, action) => {
                state.confirmingService = false;
                state.confirmStatus = action.payload.status;
            })

            .addCase(startService.pending, (state) => {
                state.startingService = true;
            })
            .addCase(startService.fulfilled, (state, action) => {
                state.startingService = false;
                const { status, booking } = action.payload;
                state.startStatus = status;
                state.booking = booking;
            })
            .addCase(startService.rejected, (state, action) => {
                state.startingService = false;
                state.startStatus = action.payload.status;
            })

            .addCase(cancelService.pending, (state) => {
                state.cancellingService = true;
            })
            .addCase(cancelService.fulfilled, (state, action) => {
                state.cancellingService = false;
                const { status, booking } = action.payload;
                state.cancelStatus = status;
                state.booking = booking;
            })
            .addCase(cancelService.rejected, (state, action) => {
                state.cancellingService = false;
                state.cancelStatus = action.payload.status;
            })
    },
});

export const {
    setStatus,
    setBookingDash,
    setStartStatusDash,
    setCancelStatusDash,
    setServiceStatusDash,
    setServiceStartedDash,
    setServiceCancelledDash,
    setServiceCompletedDash,
    setServiceConfirmedDash,
} = dataSlice.actions;

export default dataSlice.reducer;
