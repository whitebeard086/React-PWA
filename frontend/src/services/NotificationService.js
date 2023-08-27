import ApiService from "./ApiService";

export async function apiGetNotifications (data) {
    return ApiService.fetchData({
        url: '/notifications',
        method: 'get',
        data
    })
}

export async function apiCreateNotification (data) {
    return ApiService.fetchData({
        url: '/notifications/new',
        method: 'post',
        data
    })
}

export async function apiReadNotification (data) {
    return ApiService.fetchData({
        url: '/notifications/read',
        method: 'post',
        data
    })
}

export async function apiReadAllNotifications (data) {
    return ApiService.fetchData({
        url: '/notifications/read-all',
        method: 'post',
        data
    })
}

export async function apiClearNotifications (data) {
    return ApiService.fetchData({
        url: '/notifications/clear',
        method: 'post',
        data
    })
}