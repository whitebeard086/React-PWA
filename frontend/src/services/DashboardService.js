import ApiService from "./ApiService";

export async function apiGetDashboardData (data) {
    return ApiService.fetchData({
        url: '/dashboard',
        method: 'get',
        data
    })
}