import { apiSlice } from '../api/apiSlice';

export const dashboardApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDashboard: builder.query({
			query: () => '/dashboard',
			providesTags: ['Dashboard'],
		}),
		completeService: builder.mutation({
			query: (data) => ({
				url: '/service/complete',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Dashboard'],
		}),
		confirmService: builder.mutation({
			query: (data) => ({
				url: '/service/confirm',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Dashboard'],
		}),
		startService: builder.mutation({
			query: (data) => ({
				url: '/service/start',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Dashboard'],
		}),
		cancelService: builder.mutation({
			query: (data) => ({
				url: '/service/cancel',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Dashboard'],
		}),
		openDispute: builder.mutation({
			query: (data) => ({
				url: '/service/dispute/new',
				method: 'POST',
				body: data,
			}),
			// invalidatesTags: ['Dashboard'],
		}),
		closeDispute: builder.mutation({
			query: (data) => ({
				url: '/service/dispute/close',
				method: 'POST',
				body: data,
			}),
			// invalidatesTags: ['Dashboard'],
		}),
	}),
});

export const { useGetDashboardQuery } = dashboardApi;

export function useDashboard() {
	const { data, isLoading, isError } = useGetDashboardQuery();

	const status = data?.status;
	const enquiries = data?.enquiries;
	const bookingsCount = data?.bookingsCount;
	const bookings = data?.bookings;
	const disputes = data?.disputes;

	return {
		dashboard: data,
		status,
		enquiries,
		bookingsCount,
		bookings,
		disputes,
		isLoading,
		isError,
	};
}
