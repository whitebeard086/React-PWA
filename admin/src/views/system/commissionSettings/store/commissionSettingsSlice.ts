import { createSlice } from '@reduxjs/toolkit'

export type CommissionSettingsState = {
    commission: boolean
    airtimeDiscount: boolean
    dataDiscount: boolean
}

export const SLICE_NAME = 'commissionSettings'

const initialState: CommissionSettingsState = {
    commission: false,
    dataDiscount: false,
    airtimeDiscount: false,
}

const commissionSettingsSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setCommission: (state, action) => {
            state.commission = action.payload
        },
        setDataDiscount: (state, action) => {
            state.dataDiscount = action.payload
        },
        setAirtimeDiscount: (state, action) => {
            state.airtimeDiscount = action.payload
        }
    }
})

export const {
    setCommission,
    setDataDiscount,
    setAirtimeDiscount,
} = commissionSettingsSlice.actions

export default commissionSettingsSlice.reducer