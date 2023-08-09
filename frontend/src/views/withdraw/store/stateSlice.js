import { createSlice } from "@reduxjs/toolkit"

const stateSlice = createSlice({
    name: 'withdraw/state',
    initialState: {
        formData: {},
        accountDialog: false,
        withdrawDialog: false,
        isValidAccountNumber: false
    },
    reducers: {
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        toggleAccountDialog: (state, action) => {
            state.accountDialog = action.payload;
        },
        toggleWithdrawDialog: (state, action) => {
            state.withdrawDialog = action.payload;
        },
        setIsValidAccountNumber: (state, action) => {
            state.isValidAccountNumber = action.payload;
        },
    },
})

export const {
    setFormData,
    toggleAccountDialog,
    toggleWithdrawDialog,
    setIsValidAccountNumber,
} = stateSlice.actions

export default stateSlice.reducer