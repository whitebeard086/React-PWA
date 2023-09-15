import { Category, Service, User } from '@/@types/common';
import { apiGetDisputes } from '@/services/HandymanService';
import { useQuery } from '@tanstack/react-query';
import { GetDisputesResponse } from './types';





export const useGetDisputes = () => {
	return useQuery({
		queryKey: ['disputes'],
        queryFn: async () => {
			const response = await apiGetDisputes<GetDisputesResponse>();
			return response.data;
		},
		staleTime: 5000,
		// cacheTime: 10000,
		refetchInterval: 50000,
	});
};