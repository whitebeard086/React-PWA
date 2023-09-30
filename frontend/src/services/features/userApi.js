import { apiSlice } from '../api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => '/profile/user',
			providesTags: ['User'],
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
});

export const {
	useGetUserQuery,
	useCreatePinMutation,
	useUpdatePinMutation,
	useValidateMutation,
} = userApi;

export function useUser() {
	const {
		user,
		userType,
		hasPin,
		verifiedPhone,
		hasService,
		isLoading,
		isError,
	} = useGetUserQuery(undefined, {
		selectFromResult: ({ data, isLoading, isError }) => ({
			data: data ?? {},
			user: data?.user,
			userType: data?.user?.profile_type?.name,
			hasPin: data?.hasPin,
			verifiedPhone: data?.user?.phone_verified_at !== null,
			hasService: Boolean(data?.user?.service),
			isLoading,
			isError,
		}),
	});

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

// export function useUser() {
// 	const { data, isLoading, isError } = useGetUserQuery();

// 	const user = data?.user;
// 	const userType = data?.user?.profile_type?.name;
// 	const hasPin = data?.hasPin;
// 	const verifiedPhone = user?.phone_verified_at !== null;
// 	const hasService = Boolean(user?.service);

// 	return {
// 		user,
// 		userType,
// 		hasPin,
// 		verifiedPhone,
// 		hasService,
// 		isLoading,
// 		isError,
// 	};
// }
