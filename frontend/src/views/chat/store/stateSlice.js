const { createSlice } = require("@reduxjs/toolkit");

const stateSlice = createSlice({
    name: 'chat/state',
    initialState: {
        message: "",
        invoiceDialog: false,
        addingItem: false,
        invoiceComplete: false,
        file: {},
        invoice: {},
        invoiceData: [],
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
        setInvoiceData: (state, action) => {
            state.invoiceData = [...state.invoiceData, action.payload]
        },
        setAddingItem: (state, action) => {
            state.addingItem = action.payload
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
    },
})

export const {
    setFile,
    setInvoice,
    setMessage,
    setAddingItem,
    setInvoiceData,
    removeInvoiceItem,
    setInvoiceComplete,
    toggleInvoiceDialog,
} = stateSlice.actions

export default stateSlice.reducer