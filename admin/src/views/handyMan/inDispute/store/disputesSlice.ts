import { createSlice } from '@reduxjs/toolkit'

export interface disputesState {
    disputeDialogOpen: boolean
    invoiceDialog: boolean
}

export const SLICE_NAME = 'disputes'

const initialState: disputesState = {
    disputeDialogOpen: false,
    invoiceDialog: false
}

const disputesSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        openDisputeDialog: (state) => {
            state.disputeDialogOpen = true;
        },
        closeDisputeDialog: (state) => {
            state.disputeDialogOpen = false;
        },
        toggleInvoiceDialog: (state, action) => {
            state.invoiceDialog = action.payload
        }
    },
})

export const {
    openDisputeDialog,
    closeDisputeDialog,
    toggleInvoiceDialog
} = disputesSlice.actions

export default disputesSlice.reducer