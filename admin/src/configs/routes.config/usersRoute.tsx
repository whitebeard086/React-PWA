import { lazy } from 'react'
import { USERS_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const usersRoute: Routes = [
    {
        key: 'users.allProviders',
        path: `${USERS_PREFIX_PATH}/providers`,
        component: lazy(() => import('@/views/users/providers')),
        authority: [ADMIN],
    },
    {
        key: 'users.allClients',
        path: `${USERS_PREFIX_PATH}/clients`,
        component: lazy(() => import('@/views/users/clients')),
        authority: [ADMIN],
    },
]

export default usersRoute
