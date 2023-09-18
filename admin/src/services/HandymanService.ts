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

export async function apiGetClosedDisputes<T>() {
    return ApiService.fetchData<T>({
        url: '/disputes/closed',
        method: 'get',
    })
}

export async function apiGetActiveBookings<T>() {
    return ApiService.fetchData<T>({
        url: '/bookings/active',
        method: 'get',
    })
}

export async function apiGetCompleteBookings<T>() {
    return ApiService.fetchData<T>({
        url: '/bookings/complete',
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

export async function apiRefundClient<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/disputes/dispute/refund-client',
        method: 'post',
        data
    })
}

export async function apiPayProvider<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: '/disputes/dispute/refund-client',
        method: 'post',
        data
    })
}
