import { createSlice } from "@reduxjs/toolkit"

const stateSlice = createSlice({
    name: 'settings/state',
    initialState: {
        deleteDialog: false,
        cancelDeleteDialog: false,
    },
    reducers: {
        toggleDeleteDialog: (state, action) => {
            state.deleteDialog = action.payload;
        },
        toggleCancelDeleteDialog: (state, action) => {
            state.cancelDeleteDialog = action.payload;
        },
    },
})

export const {
    toggleDeleteDialog,
    toggleCancelDeleteDialog,
} = stateSlice.actions

export default stateSlice.reducer