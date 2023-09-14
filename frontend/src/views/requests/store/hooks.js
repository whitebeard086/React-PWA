import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '.';
import { apiDispute, apiSendMessageQuery } from '@/services/RequestsService';
import { popNotification } from '@/utils/toast';

export const useDispute = () => {
    const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['disputes', 'dispute'],
        mutationFn: (data) => apiDispute(data),
        staleTime: 180000,
		cacheTime: 300000,
        onSuccess: (data) => {
            queryClient.invalidateQueries('dispute');
            // popNotification(
			// 	'Success',
			// 	data.message ?? 'Actions performed successfully',
			// 	'success'
			// );
        },
        onError: (error) => {
            popNotification(
                'Failed',
                error.response.data.message ?? error.message,
				'danger'
            )
        }
    })
}

export const useMessageQuery = () => {
    const dispatch = useAppDispatch();
	const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['disputes'],
        mutationFn: (data) => apiSendMessageQuery(data),
        staleTime: 180000,
		cacheTime: 300000,
        onSuccess: (data) => {
            queryClient.invalidateQueries('disputes');
        },
        onError: (error) => {
            popNotification(
                'Failed',
                error.response.data.message ?? error.message,
				'danger'
            )
        }
    })
}