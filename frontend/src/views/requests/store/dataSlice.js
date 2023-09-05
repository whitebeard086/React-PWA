import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    apiCancelService,
    apiCompleteService,
    apiConfirmService,
    apiOpenDispute,
    apiStartService,
} from "@/services/BookingService";
import { apiGetRequestsData } from "@/services/RequestsService";

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
    "payments/data/startService",
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
    "payments/data/cancelService",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiCancelService(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const openDispute = createAsyncThunk(
    "requests/data/openDispute",
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiOpenDispute(data);
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
        history: [],
        disputes: [],
        booking: {},
        dispute: {},
        serviceStatus: "idle",
        confirmStatus: "idle",
        startStatus: "idle",
        cancelStatus: "idle",
        disputeStatus: "idle",
        status: "idle",
        completingService: false,
        confirmingStatus: false,
        startingService: false,
        cancellingService: false,
        openingDispute: false,
        serviceStarted: false,
        serviceCancelled: false,
        serviceCompleted: false,
        serviceConfirmed: false,
        disputeOpened: false,
        loading: false,
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setBooking: (state, action) => {
            state.booking = action.payload;
        },
        setServiceStatus: (state, action) => {
            state.serviceStatus = action.payload;
        },
        setConfirmStatus: (state, action) => {
            state.confirmStatus = action.payload;
        },
        setStartStatus: (state, action) => {
            state.startStatus = action.payload;
        },
        setCancelStatus: (state, action) => {
            state.cancelStatus = action.payload;
        },
        setDisputeStatus: (state, action) => {
            state.disputeStatus = action.payload;
        },
        setDisputeOpened: (state, action) => {
            state.disputeOpened = action.payload;
        },
        setServiceStarted: (state, action) => {
            state.serviceStarted = action.payload;
        },
        setServiceCancelled: (state, action) => {
            state.serviceCancelled = action.payload;
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
                const { status, enquiries, bookings, history, disputes } = action.payload;
                state.status = status;
                state.enquiries = enquiries;
                state.bookings = bookings;
                state.history = history;
                state.disputes = disputes;
            })
            .addCase(getRequestsData.rejected, (state) => {
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

            .addCase(openDispute.pending, (state) => {
                state.openingDispute = true;
            })
            .addCase(openDispute.fulfilled, (state, action) => {
                state.openingDispute = false;
                const { status, booking, dispute } = action.payload;
                state.disputeStatus = status;
                state.booking = booking;
                state.dispute = dispute;
            })
            .addCase(openDispute.rejected, (state, action) => {
                state.openingDispute = false;
                state.disputeStatus = action.payload.status || 'error';
            })
    },
});

export const {
    setStatus,
    setBooking,
    setStartStatus,
    setCancelStatus,
    setConfirmStatus,
    setServiceStatus,
    setDisputeStatus,
    setDisputeOpened,
    setServiceStarted,
    setServiceCancelled,
    setServiceCompleted,
    setServiceConfirmed,
} = dataSlice.actions;
export default dataSlice.reducer;
