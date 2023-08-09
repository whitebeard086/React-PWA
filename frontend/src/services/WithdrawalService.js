import ApiService from "./ApiService";

export async function apiGetWithdrawalData (data) {
    return ApiService.fetchData({
        url: '/withdraw',
        method: 'get',
        data
    })
}

export async function apiResolveAccountNumber (data) {
    return ApiService.fetchData({
        url: '/withdraw/account/resolve',
        method: 'post',
        data
    })
}

export async function apiAddAccount (data) {
    return ApiService.fetchData({
        url: '/withdraw/new-account',
        method: 'post',
        data
    })
}

export async function apiCreateTransferRecipient (data) {
    return ApiService.fetchData({
        url: '/withdraw/transfer-recipient',
        method: 'post',
        data
    })
}

export async function apiRemoveAccount (data) {
    return ApiService.fetchData({
        url: '/withdraw/account/delete',
        method: 'post',
        data
    })
}