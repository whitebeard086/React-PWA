import ApiService from './ApiService'

export async function apiGetEnquiries<T>() {
    return ApiService.fetchData<T>({
        url: '/enquiries',
        method: 'get',
    })
}

export async function apiGetEnquiry<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/enquiries/enquiry',
        method: 'post',
        data,
    })
}
