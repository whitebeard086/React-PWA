import { Category, Chat, Invoice, InvoiceItem, Message, Service, TableQueries, User } from '@/@types/common'
import { apiGetEnquiries, apiGetEnquiry } from '@/services/HandymanService'
// import { UserWithService } from '@/views/users/store'
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

interface ServiceWithCategoryAndUser extends Service {
    category: Category
    user: User
}

interface UserWithService extends User {
    service: ServiceWithCategoryAndUser | null
}

export interface ChatWithMessages extends Chat {
    messages_count: number
    messages: Message[]
    user: UserWithService
    receiver: UserWithService
    invoices: InvoiceWithItems[]
}

interface GetEnquiriesResponse {
    status: string
    enquiries: ChatWithMessages[]
}

type GetEnquiryRequest = {
    uid: string
} 

interface GetEnquiryResponse {
    status: string
    enquiry: ChatWithMessages
}

type Filter = {
    status: string
}

export interface enquiriesState {
    loading: boolean
    enquiries: ChatWithMessages[]
    enquiry: Partial<ChatWithMessages>
    status: string
    tableData: TableQueries
    filterData: Filter
}

export const SLICE_NAME = 'enquiries'

export const getEnquiries = createAsyncThunk<GetEnquiriesResponse, void, { rejectValue: RejectedWithValueAction }>(
    `${SLICE_NAME}/getEnquiries`,
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiGetEnquiries<GetEnquiriesResponse>();
            return response.data;
        } catch (err: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const error: AxiosError<RejectedWithValueAction> = err as any;
            if (!error.response) {
                throw err;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

export const getEnquiry = createAsyncThunk<GetEnquiryResponse, GetEnquiryRequest, { rejectValue: RejectedWithValueAction }>(
    `${SLICE_NAME}/getEnquiry`,
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiGetEnquiry<GetEnquiryResponse, GetEnquiryRequest>(data);
            return response.data;
        } catch (err: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const error: AxiosError<RejectedWithValueAction> = err as any;
            if (!error.response) {
                throw err;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    status: '',
}

const initialState: enquiriesState = {
    loading: false,
    enquiries: [],
    enquiry: {},
    status: 'idle',
    tableData: initialTableData,
    filterData: initialFilterData,
}

const enquiriesSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setEnquiry: (state, action) => {
            state.enquiry = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
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

            .addCase(getEnquiry.pending, (state) => {
                state.loading = true
            })
            .addCase(getEnquiry.fulfilled, (state, action) => {
                state.loading = false
                const { enquiry, status } = action.payload
                state.status = status
                state.enquiry = enquiry
            })
            .addCase(getEnquiry.rejected, (state) => {
                state.loading = false
                state.status = 'error'
            })
    }
})

export const {
    setStatus,
    setEnquiry,
    setTableData,
    setFilterData,
} = enquiriesSlice.actions;

export default enquiriesSlice.reducer