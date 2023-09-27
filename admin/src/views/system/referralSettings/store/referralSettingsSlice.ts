import { createSlice } from '@reduxjs/toolkit'

export type ReferralSettingsState = {
    editBonus: boolean
    editPitch: boolean
}

export const SLICE_NAME = 'referralSettings'

const initialState:  ReferralSettingsState = {
    editBonus: false,
    editPitch: false,
}

const referralSettingsSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setEditBonus: (state, action) => {
            state.editBonus = action.payload
        },
        setEditPitch: (state, action) => {
            state.editPitch = action.payload
        },
    }
})

export const {
    setEditBonus,
    setEditPitch,
} = referralSettingsSlice.actions

export default referralSettingsSlice.reducer