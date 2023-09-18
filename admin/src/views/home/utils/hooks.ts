import { apiGetHomeData } from '@/services/HomeService'
import { useQuery } from '@tanstack/react-query'
import { GetHomeResponse } from './types'

export const useHomeData = () => {
    return useQuery({
        queryKey: ['home'],
        queryFn: async () => {
            const response = await apiGetHomeData<GetHomeResponse>()
            return response.data;
        },
        staleTime: 60 * 1000,
		refetchInterval: 50 * 1000,
    })
}