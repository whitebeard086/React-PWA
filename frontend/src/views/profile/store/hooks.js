import { apiAddress, apiKybUpdate } from '@/services/AuthService';
import { getUser } from '@/store/auth/userSlice';
import { popNotification } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '.';

export const useAddress = () => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['users'],
		mutationFn: (data) => apiAddress(data),
		staleTime: 180000,
		cacheTime: 300000,
		onSuccess: (data) => {
			queryClient.invalidateQueries('users');
			dispatch(getUser());
			popNotification(
				'Success',
				data.message ?? 'Actions performed successfully',
				'success'
			);
		},
		onError: (error) => {
			popNotification(
				'Failed',
				error.response.data.message ?? error.message,
				'danger'
			);
		},
	});
};

export const useKybUpdate = () => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['users'],
		mutationFn: (data) => apiKybUpdate(data),
		staleTime: 180000,
		cacheTime: 300000,
		onSuccess: (data) => {
			queryClient.invalidateQueries('users');
			dispatch(getUser());
			popNotification(
				'Success',
				data.message ?? 'Actions performed successfully',
				'success'
			);
		},
		onError: (error) => {
			popNotification(
				'Failed',
				error.response.data.message ?? error.message,
				'danger'
			);
		},
	});
};
