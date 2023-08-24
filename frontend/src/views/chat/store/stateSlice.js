import { createSlice } from "@reduxjs/toolkit"

const stateSlice = createSlice({
    name: 'chat/state',
    initialState: {
        message: "",
        invoiceDialog: false,
        paymentDialog: false,
        addingItem: false,
        invoiceComplete: false,
        viewingInvoice: false,
        file: {},
        invoice: {},
        invoiceData: [],
        invoiceNumber: null,
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload
        },
        setFile: (state, action) => {
            state.file = action.payload
        },
        setInvoice: (state, action) => {
            state.invoice = action.payload
        },
        resetInvoice: (state) => {
            state.invoiceComplete = false
            state.invoiceData = []
        },
        setInvoiceData: (state, action) => {
            state.invoiceData = [...state.invoiceData, action.payload]
        },
        setAddingItem: (state, action) => {
            state.addingItem = action.payload
        },
        setInvoiceNumber: (state, action) => {
            state.invoiceNumber = action.payload
        },
        setViewingInvoice: (state, action) => {
            state.viewingInvoice = action.payload
        },
        removeInvoiceItem: (state, action) => {
            state.invoiceData = state.invoiceData.filter((item) => item.tid !== action.payload)
        },
        setInvoiceComplete: (state, action) => {
            state.invoiceComplete = action.payload
        },
        toggleInvoiceDialog: (state, action) => {
            state.invoiceDialog = action.payload;
        },
        togglePaymentDialog: (state, action) => {
            state.paymentDialog = action.payload;
        },
    },
})

export const {
    setFile,
    setInvoice,
    setMessage,
    resetInvoice,
    setAddingItem,
    setInvoiceData,
    setInvoiceNumber,
    removeInvoiceItem,
    setViewingInvoice,
    setInvoiceComplete,
    toggleInvoiceDialog,
    togglePaymentDialog,
} = stateSlice.actions

export default stateSlice.reducer