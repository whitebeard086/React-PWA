import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from './constants';

const initialState = {
	state: {
		state: false,
		steps: 0,
	},
	kybDialog: false,
	query: {
		search: '',
	},
};
const stateSlice = createSlice({
	name: `${SLICE_NAME}/state`,
	initialState,
	reducers: {
		setState: (state, { payload }) => {
			state.state.state = payload === 0 ? false : true;
			state.state.steps = payload === 0 ? 0 : payload;
		},
		setSearch: (state, { payload }) => {
			state.query.search = payload;
		},
		toggleKybDialog: (state, action) => {
			state.kybDialog = action.payload;
		},
	},
});

export const { setState, setSearch, toggleKybDialog } = stateSlice.actions;

export default stateSlice.reducer;
