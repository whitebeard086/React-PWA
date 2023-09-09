import { Chat, Invoice, InvoiceItem, Message } from '@/@types/common'
import { apiGetEnquiries } from '@/services/HandymanService'
import { UserWithService } from '@/views/users/store'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios' 

interface RejectedWithValueAction {
    type: string
    payload: unknown
    error: { message: 'Rejected' }
    meta: {
      requestId: string
      arg: unknown
      aborted: boolean
    }
}

export interface InvoiceWithItems extends Invoice {
    items: InvoiceItem[]
}

export interface ChatWithMessages extends Chat {
    messages: Message[]
    user: UserWithService
    receiver: UserWithService
    invoices: InvoiceWithItems[]
}

interface GetEnquiriesResponse {
    status: string
    enquiries: ChatWithMessages[]
}

export interface enquiriesState {
    loading: boolean
    enquiries: ChatWithMessages[]
    status: string
}

export const SLICE_NAME = 'enquiries'

export const getEnquiries = createAsyncThunk<GetEnquiriesResponse, void, { rejectValue: RejectedWithValueAction }>(
    `${SLICE_NAME}/getEnquiries`,
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiGetEnquiries<GetEnquiriesResponse>();
            return response.data;
        } catch (err: unknown) {
            const error: AxiosError<RejectedWithValueAction> = err as any;
            if (!error.response) {
                throw err;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState: enquiriesState = {
    loading: false,
    enquiries: [],
    status: 'idle',
}

const enquiriesSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(getEnquiries.pending, (state) => {
                state.loading = true
            })
            .addCase(getEnquiries.fulfilled, (state, action) => {
                state.loading = false
                const { enquiries, status } = action.payload
                state.status = status
                state.enquiries = enquiries
            })
            .addCase(getEnquiries.rejected, (state) => {
                state.loading = false
                state.status = 'error'
            })
    }
})

export const {
    setStatus
} = enquiriesSlice.actions;

export default enquiriesSlice.reducer