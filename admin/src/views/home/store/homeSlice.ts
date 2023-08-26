import { Booking, Invoice, User } from '@/@types/common';
import { apiHomeIndex } from '@/services/HomeService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';

interface RejectedWithValueAction<ThunkArg, RejectedValue> {
    type: string
    payload: RejectedValue
    error: { message: 'Rejected' }
    meta: {
      requestId: string
      arg: ThunkArg
      aborted: boolean
    }
}

interface RecentProviderWithBookings extends User {
    bookings: Booking[] | []
}

interface RecentBookingWithInvoice extends Booking {
    invoice: Invoice
}

export type KnownError = {
    message: string;
    // status: string;
    // code: number | undefined;
};

type Home = {
    status: string
    allBookings: string
    allClients: string
    allProviders: string
    recentProviders: RecentProviderWithBookings[]
    recentCustomers: User[]
    recentBookings: RecentBookingWithInvoice[]
}

type HomeIndexResponse = Home

export type HomeIndexState = {
    loading: boolean
    allBookings: string
    allClients: string
    allProviders: string
    status: string
    recentProviders: RecentProviderWithBookings[]
    recentCustomers: User[]
    recentBookings: RecentBookingWithInvoice[]
}

export const SLICE_NAME = 'home'

// export const homeIndex = createAsyncThunk(
//     SLICE_NAME + '/homeIndex',
//     async (data, { rejectWithValue }) => {
//         try {
//             const response = await apiHomeIndex<HomeIndexResponse>();
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

export const homeIndex = createAsyncThunk<HomeIndexResponse, void, { rejectValue: KnownError }>(
    `${SLICE_NAME}/homeIndex`,
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiHomeIndex<HomeIndexResponse>();
            return response.data;
        } catch (err) {
            const error: AxiosError<KnownError> = err as any;
            if (!error.response) {
                throw err;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState: HomeIndexState = {
    loading: false,
    allBookings: '',
    allClients: '',
    allProviders: '',
    status: 'idle',
    recentProviders: [],
    recentCustomers: [],
    recentBookings: []
}

const homeSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(homeIndex.pending, (state) => {
                state.loading = true;
            })
            .addCase(homeIndex.fulfilled, (state, action) => {
                state.loading = false;
                const { status, allBookings, allClients, allProviders, recentBookings, recentProviders, recentCustomers } = action.payload;
                state.status = status;
                state.allBookings = allBookings;
                state.allClients = allClients;
                state.allProviders = allProviders;
                state.recentProviders = recentProviders;
                state.recentCustomers = recentCustomers;
                state.recentBookings = recentBookings;
            })
            .addCase(homeIndex.rejected, (state) => {
                state.loading = false;
                // const { message } = action.payload;
                state.status = 'error';
            })
    },
})

export const {
    setStatus
} = homeSlice.actions;

export default homeSlice.reducer