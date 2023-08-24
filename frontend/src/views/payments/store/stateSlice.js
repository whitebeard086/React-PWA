import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: 'payments/state',
    initialState: {
        pinDialog: false,
        depositDialog: false,
        amount: "",
    },
    reducers: {
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
        togglePinDialog: (state, action) => {
            state.pinDialog = action.payload;
        },
        toggleDepositDialog: (state, action) => {
            state.depositDialog = action.payload;
        },
    },
})

export const {
    setAmount,
    togglePinDialog,
    toggleDepositDialog,
} = stateSlice.actions;

export default stateSlice.reducer