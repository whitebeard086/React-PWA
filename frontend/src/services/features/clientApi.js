import { apiSlice } from '../api/apiSlice';

export const clientApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getClient: builder.query({
			query: (slug) => `/profile/client/${slug}`,
			providesTags: (slug) => [{ type: 'Client', id: slug }],
		}),
	}),
});

export const { useGetClientQuery } = clientApi;

export function useClient(slug) {
	const { client, isLoading, isError, isSuccess } = useGetClientQuery(slug, {
		selectFromResult: ({ data, isLoading, isError, isSuccess }) => ({
			data: data ?? {},
			client: data?.client,
			isLoading,
			isError,
			isSuccess,
		}),
	});

	return {
		client,
		isLoading,
		isError,
		isSuccess,
	};
}
