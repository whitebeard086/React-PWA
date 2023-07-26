import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
    name: 'authentication/state',
    initialState: {
		passwordActive: false,
        pwdStatus: {
            characters: false,
            number: false,
            uppercase: false,
            lowercase: false,
            specialChar: false,
        },
        emailActive: false,
        terms: false,
        termsDialog: false,
	},
    reducers: {
        togglePasswordActive: (state, action) => {
            state.passwordActive = action.payload
        },
        toggleEmailActive: (state, action) => {
            state.emailActive = action.payload
        },
        toggleTermsDialog: (state, action) => {
            state.termsDialog = action.payload
        },
        setTerms: (state, action) => {
            state.terms = action.payload
        },
        setChar: (state, action) => {
            state.pwdStatus.characters = action.payload
        },
        setNum: (state, action) => {
            state.pwdStatus.number = action.payload
        },
        setUpCase: (state, action) => {
            state.pwdStatus.uppercase = action.payload
        },
        setLoCase: (state, action) => {
            state.pwdStatus.lowercase = action.payload
        },
        setSpChar: (state, action) => {
            state.pwdStatus.specialChar = action.payload
        },
    },
})

export const {
    togglePasswordActive,
    toggleEmailActive,
    toggleTermsDialog,
    setTerms,
    setChar,
    setNum,
    setUpCase,
    setLoCase,
    setSpChar,
} = stateSlice.actions

export default stateSlice.reducer;