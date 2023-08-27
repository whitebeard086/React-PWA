import { createSlice } from "@reduxjs/toolkit";

const stateSlice = createSlice({
    name: 'notifications/state',
    initialState: {
        selected: null,
        clearMessages: false,
    },
    reducers: {
        setSelected: (state, action) => {
            state.selected = action.payload;
        },
        toggleClearMessages: (state, action) => {
            state.clearMessages = action.payload;
        },
    },
});

export const {
    setSelected,
    toggleClearMessages,
} = stateSlice.actions;

export default stateSlice.reducer;
