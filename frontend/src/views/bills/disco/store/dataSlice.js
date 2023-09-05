import { apiVerifyCustomer } from '@/services/BillsService';
import { createApiThunk, createAsyncReducers, meta } from '@/store';
import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME, stateAdapter } from './constants';

export const verifyCustomer = createApiThunk(
	apiVerifyCustomer,
	`${SLICE_NAME}/data/verifyCustomer`
);

const initialState = stateAdapter.getInitialState({
	customer: { ...meta },
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
	extraReducers: (builder) => {
		createAsyncReducers(builder, verifyCustomer, 'customer', 'customer');
	},
});

export const { setStore, resetState } = dataSlice.actions;

export default dataSlice.reducer;
