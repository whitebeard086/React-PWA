import ApiService from './ApiService'

export async function apiGetEnquiries<T>() {
    return ApiService.fetchData<T>({
        url: '/enquiries',
        method: 'get',
    })
}