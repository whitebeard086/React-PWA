import { createAsyncThunk, current } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const meta = {
	// isFetching: false,
	status: 'idle',
	data: {},
	message: '',
};

export const handleAsyncThunk = async (apiFunction, data, rejectWithValue) => {
	try {
		const response = await apiFunction(data);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
};

export const createApiThunk = (apiFunction, actionType) => {
	return createAsyncThunk(actionType, async (data, { rejectWithValue }) => {
		return handleAsyncThunk(apiFunction, data, rejectWithValue);
	});
};

export const createAsyncReducers = (
	builder,
	asyncAction,
	stateName,
	payloadKey
) => {
	builder
		.addCase(asyncAction.pending, (state) => {
			state[stateName].status = 'pending';
		})
		.addCase(asyncAction.fulfilled, (state, action) => {
			state[stateName] = {
				...current(state[stateName]),
				status: 'success',
				data: action.payload[payloadKey],
				message: action.payload.message,
			};
		})
		.addCase(asyncAction.rejected, (state, action) => {
			state[stateName] = {
				...current(state[stateName]),
				status: action.payload.status ?? 'failed',
				message: action.payload.message,
			};
		});
};
