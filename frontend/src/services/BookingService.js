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