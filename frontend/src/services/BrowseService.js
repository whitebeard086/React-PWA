import ApiService from "./ApiService";

export async function apiGetBrowseData (data) {
    return ApiService.fetchData({
        url: '/browse',
        method: 'get',
        data
    })
}

export async function apiGetCategory (data) {
    return ApiService.fetchData({
        url: '/browse/category',
        method: 'post',
        data
    })
}