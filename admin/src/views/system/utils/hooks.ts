import { apiGetCategories } from '@/services/SystemService'
import { useQuery } from '@tanstack/react-query'
import { GetCategoriesResponse } from './types'

export const useGetCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await apiGetCategories<GetCategoriesResponse>()
            return response.data
        },
        staleTime: 5 * 60 * 1000,
    })
}