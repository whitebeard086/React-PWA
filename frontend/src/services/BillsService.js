import ApiService, { ApiQueryService } from './ApiService';

export async function apiGetOperators(data) {
	return ApiService.fetchData({
		url: '/bills/operators',
		method: 'get',
		data,
	});
}

export async function apiGetProducts(data) {
	return ApiService.fetchData({
		url: '/bills/operator/products',
		method: 'post',
		data,
	});
}

export async function apiBuyAirtime(data) {
	return ApiService.fetchData({
		url: '/bills/airtime',
		method: 'post',
		data,
	});
}

export async function apiBuyBundle(data) {
	return ApiService.fetchData({
		url: '/bills/data',
		method: 'post',
		data,
	});
}

export async function apiGetBillOperators(bill) {
	return ApiQueryService.fetchData({
		url: `/bills/operators/${bill}`,
		method: 'get',
	});
}

export async function apiGetOperatorProducts(data) {
	return ApiQueryService.fetchData({
		url: '/bills/operator_products',
		method: 'post',
		data,
	});
}

export async function apiVerifyCustomer(data) {
	return ApiService.fetchData({
		url: '/bills/verify_customer',
		method: 'post',
		data,
	});
}

export async function apiUseVerifyCustomer(data) {
	return ApiQueryService.fetchData({
		url: '/bills/verify_customer',
		method: 'post',
		data,
	});
}

export async function apiSimulateCredit(data) {
	return ApiQueryService.fetchData({
		url: `/simulae-credit`,
		method: 'post',
		data,
	});
}

export async function apiPayBill(data) {
	return ApiQueryService.fetchData({
		url: `/bills/pay`,
		method: 'post',
		data,
	});
}
