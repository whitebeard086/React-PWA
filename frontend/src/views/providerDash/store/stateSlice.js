const { createSlice } = require("@reduxjs/toolkit");

const stateSlice = createSlice({
    name: 'dashboard/state',
    initialState: {
        completeServiceDialog: false,
        completeService: false,
        confirmServiceDialog: false,
        confirmService: false,
        bookingID: null,
    },
    reducers: {
        setBookingID: (state, action) => {
            state.bookingID = action.payload
        },
        setConfirmService: (state, action) => {
            state.confirmService = action.payload 
        },
        setCompleteService: (state, action) => {
            state.completeService = action.payload
        },
        toggleCompleteServiceDialog: (state, action) => {
            state.completeServiceDialog = action.payload
        },
        toggleConfirmServiceDialog: (state, action) => {
            state.confirmServiceDialog = action.payload
        }
    },
})

export const {
    setBookingID,
    setConfirmService,
    setCompleteService,
    toggleConfirmServiceDialog,
    toggleCompleteServiceDialog,
} = stateSlice.actions

export default stateSlice.reducer