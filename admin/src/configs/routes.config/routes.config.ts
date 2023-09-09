import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import usersRoute from './usersRoute'
import handyManRoute from './handyManRoute'
import financeRoute from './financeRoute'
import kycRoute from './kycRoute'
import systemRoute from './systemRoute'
import { ADMIN } from '@/constants/roles.constant'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/home')),
        authority: [ADMIN],
    },
    {
        key: 'services.service',
        path: '/services/:service',
        component: lazy(() => import('@/views/service')),
        authority: [ADMIN],
    },
    ...usersRoute,
    ...handyManRoute,
    ...financeRoute,
    ...kycRoute,
    ...systemRoute
]