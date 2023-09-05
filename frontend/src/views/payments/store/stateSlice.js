import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
	name: 'payments/state',
	initialState: {
		pinDialog: false,
		depositDialog: false,
		bvnDialog: false,
		amount: '',
	},
	reducers: {
		setAmount: (state, action) => {
			state.amount = action.payload;
		},
		togglePinDialog: (state, action) => {
			state.pinDialog = action.payload;
		},
		toggleDepositDialog: (state, action) => {
			state.depositDialog = action.payload;
		},
		toggleBvnDialog: (state, action) => {
			state.bvnDialog = action.payload;
		},
	},
});

export const {
	setAmount,
	togglePinDialog,
	toggleDepositDialog,
	toggleBvnDialog,
} = stateSlice.actions;

export default stateSlice.reducer;
