import ApiService from './ApiService';

export async function apiGetCategories<T>() {
    return ApiService.fetchData<T>({
        url: '/categories',
        method: 'get',
    })
}