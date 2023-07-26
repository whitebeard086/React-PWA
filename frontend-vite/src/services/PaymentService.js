import ApiService from "./ApiService";

export const apiVerifyPaystackDeposit = async (data) => {
	return ApiService.fetchData({
		url: `/paystack/verify`,
		method: 'post',
		data,
	});
};

export const apiPaystackDeposit = async (data) => {
	return ApiService.fetchData({
		url: `/paystack/deposit`,
		method: 'post',
		data,
	});
};

export const apiPaymentsData = async (data) => {
	return ApiService.fetchData({
		url: `/payments`,
		method: 'get',
		data,
	});
};