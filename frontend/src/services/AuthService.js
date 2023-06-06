import ApiService from './ApiService'

export async function apiGetProfileTypes (data) {
    return ApiService.fetchData({
        url: '/register',
        method: 'get',
        data
    })
}

export async function apiGetUser (data) {
    return ApiService.fetchData({
        url: '/profile/user',
        method: 'get',
        data
    })
}

export async function apiGetProvider (data) {
    return ApiService.fetchData({
        url: '/profile/provider',
        method: 'post',
        data
    })
}

export async function apiSignIn (data) {
    return ApiService.fetchData({
        url: '/login',
        method: 'post',
        data
    })
}

export async function apiSignUp (data) {
    return ApiService.fetchData({
        url: '/register',
        method: 'post',
        data
    })
}

export async function apiSignOut (data) {
    return ApiService.fetchData({
        url: '/logout',
        method: 'post',
        data
    })
}

export async function apiForgotPassword (data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data
    })
}

export async function apiResetPassword (data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data
    })
}

export async function apiCheckUser (data) {
    return ApiService.fetchData({
        url: '/register/check-user',
        method: 'post',
        data
    })
}

export async function apiCheckEmail (data) {
    return ApiService.fetchData({
        url: '/register/check-email',
        method: 'post',
        data
    })
}

export async function apiVerifyEmail (data) {
    return ApiService.fetchData({
        url: '/verify-email',
        method: 'post',
        data
    })
}

export async function apiResendEmailVerification (data) {
    return ApiService.fetchData({
        url: '/verify-email/resend',
        method: 'post',
        data
    })
}

export async function apiGetCountries (data) {
    return ApiService.fetchData({
        url: '/countries',
        method: 'get',
        data
    })
}

export async function apiUpdatePhone (data) {
    return ApiService.fetchData({
        url: '/profile/phone',
        method: 'post',
        data
    })
}

export async function apiVerifyPhone (data) {
    return ApiService.fetchData({
        url: '/profile/phone/verify',
        method: 'post',
        data
    })
}

export async function apiGetCategories (data) {
    return ApiService.fetchData({
        url: '/categories',
        method: 'get',
        data
    })
}

export async function apiGetSubCategories (data) {
    return ApiService.fetchData({
        url: '/category/subcategories',
        method: 'post',
        data
    })
}

export async function apiCreateService (data) {
    return ApiService.fetchData({
        url: '/profile/service/new',
        method: 'post',
        data
    })
}

export async function apiUpdateService (data) {
    return ApiService.fetchData({
        url: '/profile/service/update',
        method: 'post',
        data
    })
}

export async function apiUploadBanner (data) {
    return ApiService.fetchData({
        url: '/profile/banner/upload',
        method: 'post',
        data
    })
}

export async function apiUploadImage (data) {
    return ApiService.fetchData({
        url: '/profile/image',
        method: 'post',
        data
    })
}