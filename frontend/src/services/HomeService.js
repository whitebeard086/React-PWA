import ApiService from "./ApiService";

export async function apiGetHomeData (data) {
    return ApiService.fetchData({
        url: '/home',
        method: 'get',
        data
    })
}

export async function apiCreateCategory (data) {
    return ApiService.fetchData({
        url: '/category',
        method: 'post',
        data
    })
}

export async function apiUpdateCategory (data) {
    return ApiService.fetchData({
        url: '/category/update',
        method: 'post',
        data
    })
}