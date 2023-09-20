/* eslint-disable @tanstack/query/exhaustive-deps */
import {
	apiGetBillOperators,
	apiGetOperatorProducts,
	apiPayBill,
	apiUseVerifyCustomer,
} from '@/services/BillsService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetOperators = (bill) => {
	return useQuery({
		queryKey: ['billOperators', bill],
		queryFn: () => apiGetBillOperators(bill),
		staleTime: 300000, // 5 minutes
		cacheTime: 600000, // 10 minutes
	});
};

export const useGetProducts = (data) => {
	return useQuery({
		queryKey: ['operatorProducts', data.operatorID],
		queryFn: () => apiGetOperatorProducts(data),
		staleTime: 300000, // 5 minutes
		cacheTime: 600000, // 10 minutes
	});
};

export const useVerifyCustomer = (data) => {
	return useQuery({
		queryKey: [data.device_number],
		queryFn: () => {
			apiUseVerifyCustomer(data);
		},
		enabled: !!data, // the query will not run if data is null or undefined
		// staleTime: 300000, // 5 minutes
		// cacheTime: 600000, // 10 minutes
	});
};

export const usePayBill = (handleError, handleSuccess) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ['billPayment'],
		mutationFn: (data) => apiPayBill(data),
		staleTime: 180000,
		cacheTime: 300000,
		onSuccess: (data) => {
			queryClient.invalidateQueries('billPayment');
			if (typeof handleSuccess === 'function') {
				handleSuccess(data);
			}
		},
		onError: (error) => {
			if (typeof handleError === 'function') {
				handleError(error);
			}
		},
	});
};
