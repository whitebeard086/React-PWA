import { apiGetBillOperators } from '@/services/BillsService';
import { useQuery } from '@tanstack/react-query';

export const useGetOperators = (bill) => {
	return useQuery({
		queryKey: ['billOperators', bill],
		queryFn: () => apiGetBillOperators(bill),
		staleTime: 3600000,
		cacheTime: 7200000,
	});
};
