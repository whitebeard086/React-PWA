import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import appConfig from '@/configs/app.config';
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from '@/constants/api.constant';
import { PERSIST_STORE_NAME } from '@/constants/app.constant';
import { onSignOutSuccess } from '@/store/auth/sessionSlice';
import { initialState, setUser } from '@/store/auth/userSlice';
import deepParseJson from '@/utils/deepParseJson';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: appConfig.apiPrefix,
		prepareHeaders: (headers, { getState }) => {
			const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
			const persistData = deepParseJson(rawPersistData);
			const accessToken = persistData.auth.session.token;

			if (accessToken) {
				headers.set(REQUEST_HEADER_AUTH_KEY, `${TOKEN_TYPE}${accessToken}`);
			}

			return headers;
		},
	}),
	tagTypes: ['User', 'KYC', 'Dashboard'],
	endpoints: (builder) => ({}),
	onError: (error, { dispatch }) => {
		if (error.status === 401) {
			dispatch(onSignOutSuccess());
			dispatch(setUser(initialState));
		}
	},
});
