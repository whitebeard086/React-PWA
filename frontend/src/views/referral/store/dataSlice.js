import { apiGetUser } from '@/services/AuthService';
import { apiGetReferrals } from '@/services/DashboardService';
import { createApiThunk, createAsyncReducers, meta } from '@/store';
import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME, stateAdapter } from './constants';

export const getUser = createApiThunk(apiGetUser, `${SLICE_NAME}/data/getUser`);
export const getReferrals = createApiThunk(
	apiGetReferrals,
	`${SLICE_NAME}/data/getReferrals`
);

const initialState = stateAdapter.getInitialState({
	user: { ...meta },
	referrals: { ...meta },
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
		createAsyncReducers(builder, getUser, 'user', 'user');
		createAsyncReducers(builder, getReferrals, 'referrals', 'referrals');
	},
});

export const { setStore, resetState } = dataSlice.actions;

export default dataSlice.reducer;
