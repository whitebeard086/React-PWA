import { createSlice } from "@reduxjs/toolkit"

const stateSlice = createSlice({
    name: 'withdraw/state',
    initialState: {
        formData: {},
        selectedAccount: null,
        deleteDialog: false,
        accountDialog: false,
        withdrawDialog: false,
        isValidAccountNumber: false
    },
    reducers: {
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        setSelectedAccount: (state, action) => {
            state.selectedAccount = action.payload;
        },
        toggleDeleteDialog: (state, action) => {
            state.deleteDialog = action.payload;
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
    toggleDeleteDialog,
    setSelectedAccount,
    toggleAccountDialog,
    toggleWithdrawDialog,
    setIsValidAccountNumber,
} = stateSlice.actions

export default stateSlice.reducer