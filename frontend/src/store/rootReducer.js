import { combineReducers } from 'redux';
import chat from '../../src/views/chat/store';
import notifications from '../../src/views/notifications/store';
import payments from '../../src/views/payments/store';
import kyc from '../../src/views/profile/kyc/store';
import requests from '../../src/views/requests/store';
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
		...asyncReducers,
	});

	return combinedReducer(state, action);
};

export default rootReducer;
