import { apiSlice } from '../api/apiSlice';

export const homeApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getGuest: builder.query({
			query: () => '/home/guest',
			providesTags: ['Guest'],
		}),
		getHome: builder.query({
			query: () => '/home',
			providesTags: ['Home'],
		}),
	}),
});

export const { useGetHomeQuery, useGetGuestQuery } = homeApi;

export function useHome() {
	const { data, status, services, categories, bookings, isLoading, isError } =
		useGetHomeQuery(undefined, {
			selectFromResult: ({ data, isLoading, isError }) => ({
				data: data ?? {},
				status: data?.status,
				services: data?.services,
				categories: data?.categories,
				bookings: data?.bookings?.data,
				isLoading,
				isError,
			}),
		});

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
	const { data, status, services, categories, isLoading, isError } =
		useGetGuestQuery(undefined, {
			selectFromResult: ({ data, isLoading, isError }) => ({
				data: data ?? {},
				status: data?.status,
				services: data?.services,
				categories: data?.categories,
				isLoading,
				isError,
			}),
		});

	return {
		guest: data,
		status,
		services,
		categories,
		isLoading,
		isError,
	};
}

/* export function useHome() {
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
} */
