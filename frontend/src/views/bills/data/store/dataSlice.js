import {
	apiBuyBundle,
	apiGetOperators,
	apiGetProducts,
} from '@/services/BillsService';
import { createApiThunk, createAsyncReducers, meta } from '@/store';
import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME, stateAdapter } from './constants';

export const getOperators = createApiThunk(
	apiGetOperators,
	`${SLICE_NAME}/data/getOperators`
);
export const getProducts = createApiThunk(
	apiGetProducts,
	`${SLICE_NAME}/data/getProducts`
);
export const buyData = createApiThunk(
	apiBuyBundle,
	`${SLICE_NAME}/data/buyData`
);

const initialState = stateAdapter.getInitialState({
	operators: { ...meta },
	products: { ...meta },
	bundle: { ...meta },
	store: null,
	pin: '',
	operator: null,
	product: null,
});

const dataSlice = createSlice({
	name: `${SLICE_NAME}/data`,
	initialState,
	reducers: {
		setStore: (state, action) => {
			state.store = action.payload === 0 ? null : action.payload;
		},
		setPin: (state, { payload }) => {
			state.pin = payload;
		},
		setProduct: (state, action) => {
			state.product = action.payload === 0 ? null : action.payload;
		},
		setOperator: (state, action) => {
			state.operator = action.payload === 0 ? null : action.payload;
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
		createAsyncReducers(builder, getOperators, 'operators', 'data');
		createAsyncReducers(builder, getProducts, 'products', 'data');
		createAsyncReducers(builder, buyData, 'bundle', 'data');
	},
});

export const { setStore, resetState, setOperator, setPin, setProduct } =
	dataSlice.actions;

export default dataSlice.reducer;
