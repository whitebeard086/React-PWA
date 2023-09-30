import { apiGetSystemCommissions } from '@/services/FinanceService'
import { useQuery } from '@tanstack/react-query'
import { GetCommissionsResponse } from './types'

export const useGetSystemCommissions = () => {
    return useQuery({
        queryKey: ['systemCommissions'],
        queryFn: async () => {
            const response = await apiGetSystemCommissions<GetCommissionsResponse>() 
            return response.data
        },
        refetchInterval: 5 * 1000,
        staleTime: 30 * 60 * 1000,
    })
}