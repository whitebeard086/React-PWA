import { apiUpdateBvn } from '@/services/AuthService';
import { apiSimulateCredit } from '@/services/BillsService';
import { getUser } from '@/store/auth/userSlice';
import { popNotification } from '@/utils/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toggleBvnDialog, toggleDepositDialog } from './stateSlice';

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

export const useSimulateCredit = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	return useMutation({
		mutationKey: ['users'],
		mutationFn: (data) => apiSimulateCredit(data),
		staleTime: 180000,
		cacheTime: 300000,
		onSuccess: (data) => {
			console.log('Data: ', data);
			queryClient.invalidateQueries('users');
			popNotification(
				'Success',
				data.message ?? 'Account funded successfully',
				'success'
			);
			dispatch(getUser());
			dispatch(toggleDepositDialog(false));
			if (location.pathname !== '/transactions') {
				navigate('/transactions');
			}
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
