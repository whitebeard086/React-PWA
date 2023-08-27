import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	state: {
		state: false,
		steps: 0,
	},
	kycDialog: false,
	query: {
		search: '',
	},
};
const stateSlice = createSlice({
	name: `kyc/state`,
	initialState,
	reducers: {
		setState: (state, { payload }) => {
			state.state.state = payload === 0 ? false : true;
			state.state.steps = payload === 0 ? 0 : payload;
		},
		setSearch: (state, { payload }) => {
			state.query.search = payload;
		},
		toggleKycDialog: (state, action) => {
			state.kycDialog = action.payload;
		},
	},
});

export const { setState, setSearch, toggleKycDialog } = stateSlice.actions;

export default stateSlice.reducer;
