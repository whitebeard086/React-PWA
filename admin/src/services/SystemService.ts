import ApiService from './ApiService';

export async function apiGetCategories<T>() {
    return ApiService.fetchData<T>({
        url: '/categories',
        method: 'get',
    })
}

export async function apiGetCategory<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/categories/category',
        method: 'post',
        data,
    })
}

export async function apiNewCategory<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/categories/new',
        method: 'post',
        data,
    })
}

export async function apiDeleteCategory<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/categories/delete',
        method: 'post',
        data,
    })
}

export async function apiUpdateCategory<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/categories/category/update',
        method: 'post',
        data,
    })
}

export async function apiUpdateSubCategory<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/categories/sub_category/update',
        method: 'post',
        data,
    })
}

export async function apiNewSubCategory<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/categories/sub_category/new',
        method: 'post',
        data,
    })
}