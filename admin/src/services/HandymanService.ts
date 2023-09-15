import ApiService, { ApiQueryService } from './ApiService'

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

export async function apiGetDisputes<T>() {
    return ApiQueryService.fetchData<T>({
        url: '/disputes',
        method: 'get',
    })
}

export async function apiGetDispute<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/disputes/dispute',
        method: 'post',
        data
    })
}
