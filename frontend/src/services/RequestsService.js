import ApiService from "./ApiService";

export async function apiGetRequestsData (data) {
    return ApiService.fetchData({
        url: '/requests',
        method: 'get',
        data
    })
}

export async function apiCompleteService (data) {
    return ApiService.fetchData({
        url: '/service/complete',
        method: 'post',
        data
    })
}