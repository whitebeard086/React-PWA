import ApiService from "./ApiService";

export async function apiGetRequestsData (data) {
    return ApiService.fetchData({
        url: '/requests',
        method: 'get',
        data
    })
}