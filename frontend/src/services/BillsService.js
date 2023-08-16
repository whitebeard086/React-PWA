import ApiService from "./ApiService";

export async function apiGetOperators (data) {
    return ApiService.fetchData({
        url: '/bills/operators',
        method: 'get',
        data
    })
}