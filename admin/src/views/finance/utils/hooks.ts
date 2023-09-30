import { apiGetReferralRewards, apiGetSystemCommissions } from '@/services/FinanceService'
import { useQuery } from '@tanstack/react-query'
import { GetCommissionsResponse, ReferralRewardsResponse } from './types'

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

export const useGetReferralRewards = () => {
    return useQuery({
        queryKey: ['referralRewards'],
        queryFn: async () => {
            const response = await apiGetReferralRewards<ReferralRewardsResponse>() 
            return response.data
        },
        refetchInterval: 5 * 1000,
        staleTime: 30 * 60 * 1000,
    })
}
