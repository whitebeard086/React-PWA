const { createSlice } = require("@reduxjs/toolkit");

const stateSlice = createSlice({
    name: 'service/state',
    initialState: {
        unavailable: [],
        editingMonday: false,
        mondayValue: '08:00',
        mondayValue2: '16:00',

        editingTuesday: false,
        tuesdayValue: '08:00',
        tuesdayValue2: '16:00',

        editingWednesday: false,
        wednesdayValue: '08:00',
        wednesdayValue2: '16:00',

        editingThursday: false,
        thursdayValue: '08:00',
        thursdayValue2: '16:00',

        editingFriday: false,
        fridayValue: '08:00',
        fridayValue2: '16:00',

        editingSaturday: false,
        saturdayValue: '08:00',
        saturdayValue2: '16:00',

        editingSunday: false,
        sundayValue: '08:00',
        sundayValue2: '16:00',
    },
    reducers: {
        makeUnavailable: (state, action) => {
            state.unavailable.push(action.payload)
        },
        makeAvailable: (state, action) => {
            state.unavailable = state.unavailable.filter((item) => item !== action.payload)
        },

        setEditingMonday: (state, action) => {
            state.editingMonday = action.payload
        },
        setMondayValue: (state, action) => {
            state.mondayValue = action.payload
        },
        setMondayValue2: (state, action) => {
            state.mondayValue2 = action.payload
        },

        setEditingTuesday: (state, action) => {
            state.editingTuesday = action.payload
        },
        setTuesdayValue: (state, action) => {
            state.tuesdayValue = action.payload
        },
        setTuesdayValue2: (state, action) => {
            state.tuesdayValue2 = action.payload
        },

        setEditingWednesday: (state, action) => {
            state.editingWednesday = action.payload
        },
        setWednesdayValue: (state, action) => {
            state.wednesdayValue = action.payload
        },
        setWednesdayValue2: (state, action) => {
            state.wednesdayValue2 = action.payload
        },

        setEditingThursday: (state, action) => {
            state.editingThursday = action.payload
        },
        setThursdayValue: (state, action) => {
            state.thursdayValue = action.payload
        },
        setThursdayValue2: (state, action) => {
            state.thursdayValue2 = action.payload
        },

        setEditingFriday: (state, action) => {
            state.editingFriday = action.payload
        },
        setFridayValue: (state, action) => {
            state.fridayValue = action.payload
        },
        setFridayValue2: (state, action) => {
            state.fridayValue2 = action.payload
        },

        setEditingSaturday: (state, action) => {
            state.editingSaturday = action.payload
        },
        setSaturdayValue: (state, action) => {
            state.saturdayValue = action.payload
        },
        setSaturdayValue2: (state, action) => {
            state.saturdayValue2 = action.payload
        },

        setEditingSunday: (state, action) => {
            state.editingSunday = action.payload
        },
        setSundayValue: (state, action) => {
            state.sundayValue = action.payload
        },
        setSundayValue2: (state, action) => {
            state.sundayValue2 = action.payload
        },
    },
})

export const {
    setEditingMonday,
    setMondayValue,
    setMondayValue2,

    setEditingTuesday,
    setTuesdayValue,
    setTuesdayValue2,

    setEditingWednesday,
    setWednesdayValue,
    setWednesdayValue2,

    setEditingThursday,
    setThursdayValue,
    setThursdayValue2,

    setEditingFriday,
    setFridayValue,
    setFridayValue2,

    setEditingSaturday,
    setSaturdayValue,
    setSaturdayValue2,

    setEditingSunday,
    setSundayValue,
    setSundayValue2,
} = stateSlice.actions;

export default stateSlice.reducer