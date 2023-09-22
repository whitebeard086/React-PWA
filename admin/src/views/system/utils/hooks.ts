import { apiGetCategories, apiGetCategory, apiUpdateCategory } from '@/services/SystemService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GetCategoriesResponse, GetCategoryRequest, GetCategoryResponse, UpdateCategoryRequest } from './types'
import { popNotification } from '@/components/ui/Notification/toast'

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

export const useGetCategory = (category: GetCategoryRequest) => {
    return useQuery({
        queryKey: ['categories', category],
        queryFn: async () => {
            const response = await apiGetCategory<GetCategoryResponse, GetCategoryRequest>(category)
            return response.data
        },
        staleTime: 5 * 60 * 1000,
    })
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['categories'],
        mutationFn: async (category: UpdateCategoryRequest) => {
            const response = await apiUpdateCategory<GetCategoryResponse, UpdateCategoryRequest>(category)
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['categories'])
            popNotification(
                'Success',
                'Category updated!',
                'success',
            )
        },
        onError: () => {
			popNotification(
                'Error',
                'Something went wrong, please try again.',
                'danger'
            )
		},
    })
}