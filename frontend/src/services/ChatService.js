import ApiService from "./ApiService";

export const apiInitiateChat = async (data) => {
	return ApiService.fetchData({
		url: `/chat`,
		method: 'post',
		data,
	});
};

export const apiSendMessage = async (data) => {
	return ApiService.fetchData({
		url: `/chat/send-message`,
		method: 'post',
		data,
	});
};

export const apiDeleteMessage = async (data) => {
	return ApiService.fetchData({
		url: `/chat/delete-message`,
		method: 'post',
		data,
	});
};

export const apiMakeInvoice = async (data) => {
	return ApiService.fetchData({
		url: `/chat/invoice`,
		method: 'post',
		data,
	});
};