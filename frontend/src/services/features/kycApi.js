import { apiSlice } from '../api/apiSlice';

export const kycApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createKyc: builder.mutation({
			query: (data) => ({
				url: '/kyc',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const { useCreateKycMutation } = kycApi;
