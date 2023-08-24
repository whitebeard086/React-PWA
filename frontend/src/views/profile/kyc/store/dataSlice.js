import { apiCreateKyc, apiGetUser } from '@/services/AuthService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const meta = {
	status: 'idle',
	data: {},
	message: '',
};

export const initiateKyc = createAsyncThunk(
	`kyc/data/initiateKyc`,
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiCreateKyc(data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getUser = createAsyncThunk(
	`kyc/data/getUser`,
	async (data, { rejectWithValue }) => {
		try {
			const response = await apiGetUser(data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const dataSlice = createSlice({
	name: `kyc/data`,
	initialState: {
		user: { ...meta },
		kycState: { status: 'idle', data: {}, message: '' },
		referrals: { ...meta },
		store: {},
	},
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
		builder
			.addCase(getUser.pending, (state) => {
				state.user.status = 'pending';
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.user.status = 'success';
				state.user.data = action.payload.user;
				state.user.message = action.payload.message;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.user.status = 'failed';
				state.user.data = action.payload.user;
				state.user.message = action.payload.message;
			})
			.addCase(initiateKyc.pending, (state) => {
				state.kycState.status = 'pending';
			})
			.addCase(initiateKyc.fulfilled, (state, action) => {
				state.kycState.status = 'success';
				state.kycState.data = action.payload.kyc;
				state.kycState.message = action.payload.message;
			})
			.addCase(initiateKyc.rejected, (state, action) => {
				state.kycState.status = 'failed';
				state.kycState.data = action.payload.kyc;
				state.kycState.message = action.payload.message;
			});
	},
});

export const { setStore, resetState } = dataSlice.actions;

export default dataSlice.reducer;
