import ApiService from "./ApiService";

export const apiBookService = async (data) => {
	return ApiService.fetchData({
		url: `/book-service`,
		method: 'post',
		data,
	});
};

export async function apiCompleteService (data) {
    return ApiService.fetchData({
        url: '/service/complete',
        method: 'post',
        data
    })
}

export async function apiConfirmService (data) {
    return ApiService.fetchData({
        url: '/service/confirm',
        method: 'post',
        data
    })
}

export async function apiStartService (data) {
    return ApiService.fetchData({
        url: '/service/start',
        method: 'post',
        data
    })
}

export async function apiCancelService (data) {
    return ApiService.fetchData({
        url: '/service/cancel',
        method: 'post',
        data
    })
}

export async function apiOpenDispute (data) {
    return ApiService.fetchData({
        url: '/service/dispute/new',
        method: 'post',
        data
    })
}