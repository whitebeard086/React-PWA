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

export async function apiUpdateCategory<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/categories/category/update',
        method: 'post',
        data,
    })
}