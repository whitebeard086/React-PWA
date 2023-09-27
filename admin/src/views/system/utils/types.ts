import { CategoryWithSubCategories, Referral, SystemConfigurations } from '@/@types/common'

export type GetCategoriesResponse = {
    status: string
    categories: CategoryWithSubCategories[]
}

export type GetCategoryRequest = {
    slug: string
}

export type NewCategoryRequest = {
    name: string
}

export type DeleteSubCategoryRequest = {
    id: number | null
    sid?: number | null
}

export type CategoryRequest = {
    slug: string
    id?: number | null
    sid?: number | null
}

export type UpdateCategoryRequest = {
    slug: string
    banner?: File | null
    icon?: File | null
    name?: string
}

export type UpdateSubCategoryRequest = {
    slug: string
    name: string
}

export type UpdateSubCategoryResponse = {
    status: string
}

export interface CategoryResponse {
    status: string
}

export interface SystemConfigurationsResponse {
    status: string
    systemConfig: SystemConfigurations
    referrals: Referral[]
}

export type SystemConfigurationsRequest = {
    bonus?: number
    pitch?: string
}

export interface GetCategoryResponse {
    status: string
    category: CategoryWithSubCategories
}