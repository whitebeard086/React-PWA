import { apiGetUsers } from '@/services/UsersService';
import { GetUsersResponse } from './types';
import { useQuery } from '@tanstack/react-query';

export const useUsersData = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await apiGetUsers<GetUsersResponse>()
            return response.data;
        },
        staleTime: 20 * 1000,
		refetchInterval: 20 * 1000,
    })
}