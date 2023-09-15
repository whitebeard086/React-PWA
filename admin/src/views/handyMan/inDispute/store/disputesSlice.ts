import { InvoiceWithItems, User } from '@/@types/common'
import { createSlice } from '@reduxjs/toolkit'
import { DisputeWithDetails, UserWithService } from '../../types'

export interface disputesState {
    invoiceDialog: boolean
    invoice: Partial<InvoiceWithItems>
    client: Partial<UserWithService>
    provider: Partial<User>
    dispute: Partial<DisputeWithDetails>
}

export const SLICE_NAME = 'disputes'

const initialState: disputesState = {
    invoiceDialog: false,
    invoice: {},
    client: {},
    provider: {},
    dispute: {},
}

const disputesSlice = createSlice({
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
} = disputesSlice.actions

export default disputesSlice.reducer