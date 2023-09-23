import { apiGetCategories, apiGetCategory, apiUpdateCategory, apiUpdateSubCategory } from '@/services/SystemService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GetCategoriesResponse, GetCategoryRequest, GetCategoryResponse, UpdateCategoryRequest, UpdateSubCategoryRequest, UpdateSubCategoryResponse } from './types'
import { popNotification } from '@/components/ui/Notification/toast'
import { useNavigate } from 'react-router-dom'
import { setEditCategory, setEditSubCategory, useAppDispatch } from '../serviceCategories/store'

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
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    return useMutation({
        mutationKey: ['categories'],
        mutationFn: async (category: UpdateCategoryRequest) => {
            const response = await apiUpdateCategory<GetCategoryResponse, UpdateCategoryRequest>(category)
            return response.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['categories'])
            if (variables.name) {
                navigate(`/configurations/service-categories/${data.category.slug}`)
                dispatch(setEditCategory(false))
            }
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

export const useUpdateSubCategory = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()
    return useMutation({
        mutationKey: ['categories'],
        mutationFn: async (subCategory: UpdateSubCategoryRequest) => {
            const response = await apiUpdateSubCategory<UpdateSubCategoryResponse, UpdateSubCategoryRequest>(subCategory)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['categories'])
            dispatch(setEditSubCategory(0))
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