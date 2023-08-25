import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import usersRoute from './usersRoute'
import handyManRoute from './handyManRoute'
import financeRoute from './financeRoute'
import kycRoute from './kycRoute'
import systemRoute from './systemRoute'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/home')),
        authority: [],
    },
    ...usersRoute,
    ...handyManRoute,
    ...financeRoute,
    ...kycRoute,
    ...systemRoute
]