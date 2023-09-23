import { InvoiceWithItems, User, UserWithService } from '@/@types/common'
import { createSlice } from '@reduxjs/toolkit'
import { DisputeWithDetails } from '../../types'

export interface bookingsState {
    invoiceDialog: boolean
    invoice: Partial<InvoiceWithItems>
    client: Partial<UserWithService>
    provider: Partial<User>
    dispute: Partial<DisputeWithDetails>
}

export const SLICE_NAME = 'bookings'

const initialState: bookingsState = {
    invoiceDialog: false,
    invoice: {},
    client: {},
    provider: {},
    dispute: {},
}

const bookingsSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        cleanInvoiceDialog: (state) => {
            state.invoiceDialog = false
            state.client = {}
            state.invoice = {}
            state.provider = {}
        },
        setClient: (state, action) => {
            state.client = action.payload
        },
        setDispute: (state, action) => {
            state.dispute = action.payload
        },
        setInvoice: (state, action) => {
            state.invoice = action.payload;
        },
        setProvider: (state, action) => {
            state.provider = action.payload
        },
        toggleInvoiceDialog: (state, action) => {
            state.invoiceDialog = action.payload
        }
    },
})

export const {
    setClient,
    setDispute,
    setInvoice,
    setProvider,
    cleanInvoiceDialog,
    toggleInvoiceDialog
} = bookingsSlice.actions

export default bookingsSlice.reducer