import { HomeResponse } from '@/@types/home'
import ApiService from './ApiService'

export async function apiHomeIndex<T>() {
    return ApiService.fetchData<T>({
        url: '/home',
        method: 'get',
    })
}