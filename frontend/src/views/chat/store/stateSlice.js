const { createSlice } = require("@reduxjs/toolkit");

const stateSlice = createSlice({
    name: 'chat/state',
    initialState: {
        message: "",
        file: {},
        invoice: {},
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
    },
})

export const {
    setFile,
    setInvoice,
    setMessage,
} = stateSlice.actions

export default stateSlice.reducer