import { apiBuyBundle, apiVerifyCustomer } from '@/services/BillsService';
import { createApiThunk, createAsyncReducers, meta } from '@/store';
import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME, stateAdapter } from './constants';

export const verifyCustomer = createApiThunk(
	apiVerifyCustomer,
	`${SLICE_NAME}/data/verifyCustomer`
);
export const buyData = createApiThunk(
	apiBuyBundle,
	`${SLICE_NAME}/data/buyData`
);

const initialState = stateAdapter.getInitialState({
	customer: { ...meta },
	store: null,
	product: null,
	bundle: { ...meta },
});

const dataSlice = createSlice({
	name: `${SLICE_NAME}/data`,
	initialState,
	reducers: {
		setStore: (state, action) => {
			state.store = action.payload === 0 ? null : action.payload;
		},
		setProduct: (state, action) => {
			state.product = action.payload === 0 ? null : action.payload;
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
		createAsyncReducers(builder, buyData, 'bundle', 'data');
	},
});

export const { setStore, resetState, setProduct } = dataSlice.actions;

export default dataSlice.reducer;
