import { apiSlice } from '../api/apiSlice';

export const providerApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProvider: builder.query({
			query: (slug) => `/profile/provider/${slug}`,
			providesTags: (result, error, slug) => [{ type: 'Provider', id: slug }],
		}),
		uploadBanner: builder.mutation({
			query: (data) => ({
				url: '/profile/banner/upload',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Provider'],
		}),
	}),
});

export const { useGetProviderQuery, useUploadBannerMutation } = providerApi;

export function useProvider(slug) {
	const {
		data,
		status,
		service,
		provider,
		workdays,
		isLoading,
		isError,
		isSuccess,
	} = useGetProviderQuery(slug, {
		selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
			data: data ?? {},
			status: data?.status,
			provider: data?.provider,
			service: data?.provider?.service,
			workdays: data?.provider?.service?.workdays,
			isLoading,
			isError,
			isSuccess,
		}),
	});

	return {
		provider,
		status,
		service,
		workdays,
		isLoading,
		isError,
		isSuccess,
	};
}
