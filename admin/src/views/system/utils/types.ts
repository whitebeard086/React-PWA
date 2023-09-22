import { CategoryWithSubCategories } from '@/@types/common'

export type GetCategoriesResponse = {
    status: string
    categories: CategoryWithSubCategories[]
}

export type GetCategoryRequest = {
    slug: string
}

export type UpdateCategoryRequest = {
    slug: string
    banner?: File | null
    icon?: File | null
}

export interface GetCategoryResponse {
    status: string
    category: CategoryWithSubCategories
}