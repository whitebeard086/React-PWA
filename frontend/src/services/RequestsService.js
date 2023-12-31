import ApiService, { ApiQueryService } from "./ApiService";

export async function apiGetRequestsData (data) {
    return ApiService.fetchData({
        url: '/requests',
        method: 'get',
        data
    })
}

export async function apiGetDispute (data) {
    return ApiService.fetchData({
        url: '/requests/disputes/dispute',
        method: 'post',
        data
    })
}

export async function apiSendMessage (data) {
    return ApiService.fetchData({
        url: '/requests/disputes/dispute/send-message',
        method: 'post',
        data
    })
}

export async function apiDispute(data) {
	return ApiQueryService.fetchData({
		url: '/requests/disputes/dispute',
		method: 'post',
		data,
	});
}

export async function apiSendMessageQuery(data) {
	return ApiQueryService.fetchData({
		url: '/requests/disputes/dispute/send-message',
		method: 'post',
		data,
	});
}