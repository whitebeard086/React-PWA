import ApiService from './ApiService'

export async function apiHomeIndex<T>() {
    return ApiService.fetchData<T>({
        url: '/home',
        method: 'get',
    })
}

export async function apiGetHomeData<T>() {
    return ApiService.fetchData<T>({
        url: '/home',
        method: 'get',
    })
}