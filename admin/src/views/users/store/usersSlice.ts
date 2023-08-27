import { Booking, Service, User, Category } from '@/@types/common';
import { apiUsersIndex } from '@/services/UsersService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios';

export interface UserWithBookings extends User {
    bookings: Booking[] | []
}

export interface ServiceWithCategoryAndBookings extends Service {
    category: Category
    bookings: Booking[]
}

export interface UserWithService extends User {
    service: ServiceWithCategoryAndBookings
}

export type KnownError = {
    message: string;
};

interface UsersIndexResponse {
    status: string
    allClients: UserWithBookings[]
    allProviders: UserWithService[]
}

export interface UsersIndexState {
    loading: boolean
    allClients: UserWithBookings[]
    allProviders: UserWithService[]
    status: string
}

export const SLICE_NAME = 'users'

export const usersIndex = createAsyncThunk<UsersIndexResponse, void, { rejectValue: KnownError }>(
    `${SLICE_NAME}/usersIndex`,
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiUsersIndex<UsersIndexResponse>();
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

const initialState: UsersIndexState = {
    loading: false,
    allClients: [],
    allProviders: [],
    status: 'idle',
}

const usersSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(usersIndex.pending, (state) => {
                state.loading = true
            })
            .addCase(usersIndex.fulfilled, (state, action) => {
                state.loading = false
                const { status, allClients, allProviders } = action.payload
                state.status = status
                state.allClients = allClients
                state.allProviders = allProviders
            })
            .addCase(usersIndex.rejected, (state, action) => {
                state.loading = false
                state.status = 'error'
            })
    }
})

export const {
    setStatus
} = usersSlice.actions;

export default usersSlice.reducer