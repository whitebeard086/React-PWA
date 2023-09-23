import ApiService from './ApiService'

export async function apiUsersIndex<T>() {
    return ApiService.fetchData<T>({
        url: '/users',
        method: 'get',
    })
}

export async function apiGetUsers<T>() {
    return ApiService.fetchData<T>({
        url: '/users',
        method: 'get',
    })
}