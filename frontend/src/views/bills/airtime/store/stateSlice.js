import { createSlice } from "@reduxjs/toolkit"

const stateSlice = createSlice({
    name: 'airtime/state',
    initialState: {
        pin: "",
        pinDialog: false,
        selectedOperator: null,
        operator: null,
        formData: {},
    },
    reducers: {
        setPin: (state, action) => {
            state.pin = action.payload;
        },
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        setOperator: (state, action) => {
            state.operator = action.payload;
        },
        togglePinDialog: (state, action) => {
            state.pinDialog = action.payload;
        },
        setSelectedOperator: (state, action) => {
            state.selectedOperator = action.payload;
        }
    },
})

export const {
    setPin,
    setFormData,
    setOperator,
    togglePinDialog,
    setSelectedOperator,
} = stateSlice.actions

export default stateSlice.reducer