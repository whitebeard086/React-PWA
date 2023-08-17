import ApiService from "./ApiService";

export async function apiGetOperators (data) {
    return ApiService.fetchData({
        url: '/bills/operators',
        method: 'get',
        data
    })
}

export async function apiGetProducts (data) {
    return ApiService.fetchData({
        url: '/bills/operator/products',
        method: 'post',
        data
    })
}

export async function apiBuyAirtime (data) {
    return ApiService.fetchData({
        url: '/bills/airtime',
        method: 'post',
        data
    })
}