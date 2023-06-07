import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: 'payments/state',
    initialState: {
        depositDialog: false,
        amount: "",
    },
    reducers: {
        toggleDepositDialog: (state, action) => {
            state.depositDialog = action.payload;
        },
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
    },
})

export const {
    toggleDepositDialog,
    setAmount,
} = stateSlice.actions;

export default stateSlice.reducer