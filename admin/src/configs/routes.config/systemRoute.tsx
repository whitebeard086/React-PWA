import { lazy } from 'react'
import { SYSTEM_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const systemRoute: Routes = [
    {
        key: 'system.serviceCategories',
        path: `${SYSTEM_PREFIX_PATH}/service-categories`,
        component: lazy(() => import('@/views/system/serviceCategories')),
        authority: [ADMIN],
    },
    {
        key: 'system.referralSettings',
        path: `${SYSTEM_PREFIX_PATH}/referral-settings`,
        component: lazy(() => import('@/views/system/referralSettings')),
        authority: [ADMIN],
    },
    {
        key: 'system.commissionSettings',
        path: `${SYSTEM_PREFIX_PATH}/commission-settings`,
        component: lazy(() => import('@/views/system/commissionSettings')),
        authority: [ADMIN],
    },
]

export default systemRoute
