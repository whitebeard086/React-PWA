import {
	apiBuyAirtime,
	apiGetOperators,
	apiGetProducts,
} from '@/services/BillsService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getOperators = createAsyncThunk(
	'airtime/data/getOperators',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiGetOperators(data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getProducts = createAsyncThunk(
	'airtime/data/getProducts',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiGetProducts(data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const buyAirtime = createAsyncThunk(
	'airtime/data/buyAirtime',
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiBuyAirtime(data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const dataSlice = createSlice({
	name: 'airtime/data',
	initialState: {
		gettingOperators: false,
		operators: [],
		operatorStatus: 'idle',
		operatorMessage: '',
		gettingProducts: false,
		products: [],
		airtime: {},
		productStatus: 'idle',
		productMessage: '',
		buyingAirtime: false,
		buyStatus: 'idle',
		buyMessage: '',
		product: null,
		store: null,
	},
	reducers: {
		setOperatorStatus: (state, action) => {
			state.operatorStatus = action.payload;
		},
		setProductStatus: (state, action) => {
			state.productStatus = action.payload;
		},
		setBuyStatus: (state, action) => {
			state.buyStatus = action.payload;
		},
		setProduct: (state, action) => {
			state.product = action.payload === 0 ? null : action.payload;
		},
		setStore: (state, action) => {
			state.store = action.payload === 0 ? null : action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOperators.pending, (state) => {
				state.gettingOperators = true;
			})
			.addCase(getOperators.fulfilled, (state, action) => {
				state.gettingOperators = false;
				const { operators, status } = action.payload;
				state.operatorStatus = status;
				state.operators = operators?.data?.filter(
					(item) => item.name !== 'Smile' && item.name !== 'Visafone'
				);
				state.operatorMessage = '';
			})
			.addCase(getOperators.rejected, (state, action) => {
				state.gettingOperators = false;
				const { status, message } = action.payload;
				state.operatorMessage = message;
				state.operatorStatus = status || 'error';
				state.operators = [];
			})

			.addCase(getProducts.pending, (state) => {
				state.gettingProducts = true;
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.gettingProducts = false;
				const { products, status } = action.payload;
				state.productStatus = status;
				state.products = products?.data;
				state.productMessage = '';

				state.airtime = state.products?.filter(
					(item) => item.fee_type === 'RANGE'
				)[0];
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.gettingProducts = false;
				const { status, message } = action.payload;
				state.productMessage = message;
				state.productStatus = status || 'error';
				state.products = [];
			})

			.addCase(buyAirtime.pending, (state) => {
				state.buyingAirtime = true;
			})
			.addCase(buyAirtime.fulfilled, (state, action) => {
				state.buyingAirtime = false;
				const { status } = action.payload;
				state.buyStatus = status;
			})
			.addCase(buyAirtime.rejected, (state, action) => {
				state.buyingAirtime = false;
				const { status, message } = action.payload;
				state.buyStatus = status || 'error';
				state.buyMessage = message;
			});
	},
});

export const {
	setBuyStatus,
	setProductStatus,
	setOperatorStatus,
	setStore,
	setProduct,
} = dataSlice.actions;

export default dataSlice.reducer;
