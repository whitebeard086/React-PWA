import { apiSlice } from '../api/apiSlice';

export const paymentApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		payments: builder.query({
			query: () => '/payments',
			providesTags: ['Payment'],
		}),
	}),
});

export const { usePaymentsQuery } = paymentApi;
