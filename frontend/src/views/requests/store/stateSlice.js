import { createSlice } from "@reduxjs/toolkit"

const stateSlice = createSlice({
    name: 'requests/state',
    initialState: {
        startServiceDialog: false,
        startService: false,
        completeServiceDialog: false,
        completeService: false,
        confirmServiceDialog: false,
        confirmService: false,
        cancelServiceDialog: false,
        cancelService: false,
        openDisputeDialog: false,
        closeDisputeDialog: false,
        openDispute: false,
        uploadImageDialog: false,
        bookingID: null,
        files: [],
    },
    reducers: {
        setFiles: (state, action) => {
            state.files = [...state.files, action.payload]
        },
        removeFile: (state, action) => {
            state.files = state.files.filter(file => file.name !== action.payload.name)
        },
        resetFiles: (state) => {
            if (state.files !== []) {
                state.files = []
            }
        },
        setBookingID: (state, action) => {
            state.bookingID = action.payload
        },
        setOpenDispute: (state, action) => {
            state.openDispute = action.payload
        },
        setStartService: (state, action) => {
            state.startService = action.payload
        },
        setCancelService: (state, action) => {
            state.cancelService = action.payload
        },
        setConfirmService: (state, action) => {
            state.confirmService = action.payload 
        },
        setCompleteService: (state, action) => {
            state.completeService = action.payload
        },
        toggleUploadImageDialog: (state, action) => {
            state.uploadImageDialog = action.payload
        },
        toggleOpenDisputeDialog: (state, action) => {
            state.openDisputeDialog = action.payload
        },
        toggleCloseDisputeDialog: (state, action) => {
            state.closeDisputeDialog = action.payload
        },
        toggleStartServiceDialog: (state, action) => {
            state.startServiceDialog = action.payload
        },
        toggleCancelServiceDialog: (state, action) => {
            state.cancelServiceDialog = action.payload
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
    setFiles,
    removeFile,
    resetFiles,
    setBookingID,
    setOpenDispute,
    setStartService,
    setCancelService,
    setConfirmService,
    setCompleteService,
    toggleUploadImageDialog,
    toggleOpenDisputeDialog,
    toggleCloseDisputeDialog,
    toggleStartServiceDialog,
    toggleCancelServiceDialog,
    toggleConfirmServiceDialog,
    toggleCompleteServiceDialog,
} = stateSlice.actions

export default stateSlice.reducer