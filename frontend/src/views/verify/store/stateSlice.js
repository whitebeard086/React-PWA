import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: 'verify/state',
    initialState: {
        country: null,
        resent: false,
    },
    reducers: {
        setCountry: (state, action) => {
            state.country = action.payload;
        },
        setResent: (state, action) => {
            state.resent = action.payload
        },
    }
})

export const {
    setCountry,
    setResent,
} = stateSlice.actions;

export default stateSlice.reducer;