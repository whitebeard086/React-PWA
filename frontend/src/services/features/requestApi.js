import { apiSlice } from '../api/apiSlice';

export const requestApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRequest: builder.query({
			query: () => '/requests',
			providesTags: ['Request'],
		}),
		completeService: builder.mutation({
			query: (data) => ({
				url: '/service/complete',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Request'],
		}),
		confirmService: builder.mutation({
			query: (data) => ({
				url: '/service/confirm',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Request'],
		}),
		startService: builder.mutation({
			query: (data) => ({
				url: '/service/start',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Request'],
		}),
		cancelService: builder.mutation({
			query: (data) => ({
				url: '/service/cancel',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Request'],
		}),
	}),
});

export const {
	useGetRequestQuery,
	useCompleteServiceMutation,
	useConfirmServiceMutation,
	useStartServiceMutation,
	useCancelServiceMutation,
} = requestApi;

export function useRequest() {
	const { disputes, enquiries, chats, history, bookings, isLoading, isError } =
		useGetRequestQuery(undefined, {
			selectFromResult: ({ data, isLoading, isError }) => {
				const { disputes, enquiries, history, bookings } = data ?? [];
				const chats =
					enquiries?.filter((item) => item?.messages?.length > 0) || [];

				return {
					disputes,
					enquiries,
					history,
					bookings,
					chats,
					isLoading,
					isError,
				};
			},
		});

	return {
		disputes,
		enquiries,
		history,
		bookings,
		chats,
		isLoading,
		isError,
	};
}
