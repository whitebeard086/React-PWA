import { apiGetCategories, apiGetCategory, apiNewCategory, apiNewSubCategory, apiUpdateCategory, apiUpdateSubCategory } from '@/services/SystemService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CategoryResponse, GetCategoriesResponse, GetCategoryRequest, GetCategoryResponse, NewCategoryRequest, UpdateCategoryRequest, UpdateSubCategoryRequest, UpdateSubCategoryResponse } from './types'
import { popNotification } from '@/components/ui/Notification/toast'
import { useNavigate } from 'react-router-dom'
import { closeCategoryDialog, setEditCategory, setEditSubCategory, setNewSubCategory, useAppDispatch } from '../serviceCategories/store'
import axios, { AxiosError } from 'axios'

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

export const useNewCategory = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()
    return useMutation({
        mutationKey: ['categories'],
        mutationFn: async (data: NewCategoryRequest) => {
            const response = await apiNewCategory<CategoryResponse, NewCategoryRequest>(data)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['categories'])
            dispatch(closeCategoryDialog())
            popNotification(
                'Success',
                'Category added!',
                'success',
            )
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const { response } = error
                if (response?.data.status === 'duplicate error') {
                    popNotification(
                        'Category Already Exists',
                        'This category already exists, choose a different name.',
                        'warning'
                    )
                }
                if (response?.data.status === 'error') {
                    popNotification(
                        'Error',
                        'Something went wrong, please try again.',
                        'danger'
                    )
                }
            } else {
                popNotification(
                    'Category Already Exists',
                    'This category already exists, choose a different name.',
                    'warning'
                )
            }
        }
    })
}

export const useNewSubCategory = () => {
    const queryClient = useQueryClient()
    const dispatch = useAppDispatch()
    return useMutation({
        mutationKey: ['categories'],
        mutationFn: async (subCategory: UpdateSubCategoryRequest) => {
            const response = await apiNewSubCategory<UpdateSubCategoryResponse, UpdateSubCategoryRequest>(subCategory)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['categories'])
            dispatch(setNewSubCategory(false))
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