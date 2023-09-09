import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME, stateAdapter } from './constants';

const initialState = stateAdapter.getInitialState({
	store: {},
});

const dataSlice = createSlice({
	name: `${SLICE_NAME}/data`,
	initialState,
	reducers: {
		setStore: (state, action) => {
			state.store = action.payload === 0 ? {} : action.payload;
		},
		resetState: (state, action) => {
			const resetActions = {
				user: () => {
					state.user = initialState.user;
				},
			};

			const resetAction = resetActions[action.payload];
			if (resetAction) {
				resetAction();
			}
		},
	},
	extraReducers: (builder) => {},
});

export const { setStore, resetState } = dataSlice.actions;

export default dataSlice.reducer;
