import { apiSlice } from '@/services/api/apiSlice';
import { combineReducers } from 'redux';
import chat from '../../src/views/chat/store';
import notifications from '../../src/views/notifications/store';
import payments from '../../src/views/payments/store';
import kyc from '../../src/views/profile/kyc/store';
import requests from '../../src/views/requests/store';
import settings from '../../src/views/settings/store';
import withdraw from '../../src/views/withdraw/store';
import auth from './auth';

const rootReducer = (asyncReducers) => (state, action) => {
	const combinedReducer = combineReducers({
		auth,
		payments,
		withdraw,
		requests,
		notifications,
		chat,
		kyc,
		settings,
		[apiSlice.reducerPath]: apiSlice.reducer,
		...asyncReducers,
	});

	return combinedReducer(state, action);
};

export default rootReducer;
