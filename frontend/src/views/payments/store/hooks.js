import { apiUpdateBvn } from '@/services/AuthService';
import { getUser } from '@/store/auth/userSlice';
import { popNotification } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { toggleBvnDialog } from './stateSlice';

export const useUpdateBvn = () => {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	return useMutation({
		mutationKey: ['users'],
		mutationFn: ({ data, userID }) => apiUpdateBvn(data, userID),
		staleTime: 180000,
		cacheTime: 300000,
		onSuccess: () => {
			queryClient.invalidateQueries('users');
			popNotification('Success', 'Details updated successfully', 'success');
			dispatch(getUser());
			dispatch(toggleBvnDialog(false));
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
