import { apiSlice } from '../api/apiSlice';

export const homeApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getGuest: builder.query({
			query: () => '/home/guest',
			providesTags: ['Guest'],
			staleTime: 15 * 60 * 1000, // data remains fresh for 15 minutes
		}),
		getHome: builder.query({
			query: () => '/home',
			providesTags: ['Home'],
			staleTime: 15 * 60 * 1000, // data remains fresh for 15 minutes
		}),
	}),
	keepUnusedDataFor: 15 * 60, // keep unused data for 15 minutes
});

export const { useGetHomeQuery, useGetGuestQuery } = homeApi;

export function useHome() {
	const { data, isLoading, isError } = useGetHomeQuery();

	const status = data?.status;
	const services = data?.services;
	const categories = data?.categories;
	const bookings = data?.bookings?.data;

	return {
		home: data,
		status,
		services,
		categories,
		bookings,
		isLoading,
		isError,
	};
}

export function useGuest() {
	const { data, isLoading, isError } = useGetGuestQuery();

	const status = data?.status;
	const services = data?.services;
	const categories = data?.categories;

	return {
		guest: data,
		status,
		services,
		categories,
		isLoading,
		isError,
	};
}
