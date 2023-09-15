import { InvoiceWithItems, User } from '@/@types/common'
import { createSlice } from '@reduxjs/toolkit'
import { UserWithService } from '../../types'

export interface disputesState {
    invoiceDialog: boolean
    invoice: Partial<InvoiceWithItems>
    client: Partial<UserWithService>
    provider: Partial<User>
}

export const SLICE_NAME = 'disputes'

const initialState: disputesState = {
    invoiceDialog: false,
    invoice: {},
    client: {},
    provider: {},
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
    setInvoice,
    setProvider,
    cleanInvoiceDialog,
    toggleInvoiceDialog
} = disputesSlice.actions

export default disputesSlice.reducer