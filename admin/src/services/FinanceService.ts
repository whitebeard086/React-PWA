import ApiService from './ApiService';

export async function apiGetSystemCommissions<T>() {
    return ApiService.fetchData<T>({
        url: '/finance/system-commissions',
        method: 'get',
    })
}

export async function apiGetReferralRewards<T>() {
    return ApiService.fetchData<T>({
        url: '/finance/referral-rewards',
        method: 'get',
    })
}