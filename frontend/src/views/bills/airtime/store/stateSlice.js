import { createSlice } from "@reduxjs/toolkit"

const stateSlice = createSlice({
    name: 'airtime/state',
    initialState: {
        selectedOperator: null,
        operator: null,
        formData: {},
    },
    reducers: {
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        setOperator: (state, action) => {
            state.operator = action.payload;
        },
        setSelectedOperator: (state, action) => {
            state.selectedOperator = action.payload;
        }
    },
})

export const {
    setFormData,
    setOperator,
    setSelectedOperator,
} = stateSlice.actions

export default stateSlice.reducer