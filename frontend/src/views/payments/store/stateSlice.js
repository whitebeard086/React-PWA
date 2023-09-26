import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
	name: 'payments/state',
	initialState: {
		pinDialog: false,
		depositDialog: false,
		bvnDialog: false,
		validate: false,
		validateAttempts: 0,
		amount: '',
	},
	reducers: {
		setAmount: (state, action) => {
			state.amount = action.payload;
		},
		togglePinDialog: (state, action) => {
			state.pinDialog = action.payload;
		},
		toggleValidate: (state, action) => {
			state.validate = action.payload;
		},
		toggleDepositDialog: (state, action) => {
			state.depositDialog = action.payload;
		},
		toggleBvnDialog: (state, action) => {
			state.bvnDialog = action.payload;
		},
		setValidateAttempts: (state, action) => {
			if (action.payload === undefined) {
				state.validateAttempts += 1;
			} else {
				state.validateAttempts = 0;
			}
		},
	},
});

export const {
	setAmount,
	togglePinDialog,
	toggleDepositDialog,
	toggleBvnDialog,
	toggleValidate,
	setValidateAttempts,
} = stateSlice.actions;

export default stateSlice.reducer;
