import ApiService from './ApiService';

export async function apiGetDashboardData(data) {
	return ApiService.fetchData({
		url: '/dashboard',
		method: 'get',
		data,
	});
}

export async function apiGetReferrals(data) {
	return ApiService.fetchData({
		url: '/referrals',
		method: 'get',
		data,
	});
}
