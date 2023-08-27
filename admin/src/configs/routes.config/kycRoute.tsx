import { lazy } from 'react'
import { KYC_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const kycRoute: Routes = [
    {
        key: 'kyc.pending',
        path: `${KYC_PREFIX_PATH}/pending`,
        component: lazy(() => import('@/views/kyc/pending')),
        authority: [ADMIN],
    },
    {
        key: 'kyc.rejections',
        path: `${KYC_PREFIX_PATH}/rejections`,
        component: lazy(() => import('@/views/kyc/rejections')),
        authority: [ADMIN],
    },
]

export default kycRoute
