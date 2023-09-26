import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => '/profile/user',
			providesTags: ['User'],
			staleTime: 15 * 60 * 1000, // data remains fresh for 15 minutes
		}),
		createPin: builder.mutation({
			query: (data) => ({
				url: '/profile/pin',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['User'],
		}),
		UpdatePin: builder.mutation({
			query: (data) => ({
				url: '/profile/pin/update',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['User'],
		}),
		validate: builder.mutation({
			query: (data) => ({
				url: '/profile/pin/validate',
				method: 'POST',
				body: data,
			}),
		}),
	}),
	keepUnusedDataFor: 15 * 60, // keep unused data for 15 minutes
});

export const {
	useGetUserQuery,
	useCreatePinMutation,
	useUpdatePinMutation,
	useValidateMutation,
} = userApi;

export function useUser() {
	const { data, isLoading, isError } = useGetUserQuery();

	const user = data?.user;
	const userType = data?.user?.profile_type?.name;
	const hasPin = data?.hasPin;
	const verifiedPhone = user?.phone_verified_at !== null;
	const hasService = Boolean(user?.service);

	return {
		user,
		userType,
		hasPin,
		verifiedPhone,
		hasService,
		isLoading,
		isError,
	};
}
