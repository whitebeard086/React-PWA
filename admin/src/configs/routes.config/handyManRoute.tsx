import { lazy } from 'react'
import { HANDY_MAN_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const handyManRoute: Routes = [
    {
        key: 'handyMan.messages',
        path: `${HANDY_MAN_PREFIX_PATH}/messages`,
        component: lazy(() => import('@/views/handyMan/messages')),
        authority: [ADMIN],
    },
    {
        key: 'handyMan.messages',
        path: `${HANDY_MAN_PREFIX_PATH}/messages/:uid`,
        component: lazy(() => import('@/views/handyMan/messages/message')),
        authority: [ADMIN],
    },
    {
        key: 'handyMan.activeBookings',
        path: `${HANDY_MAN_PREFIX_PATH}/active-bookings`,
        component: lazy(() => import('@/views/handyMan/activeBookings')),
        authority: [ADMIN],
    },
    {
        key: 'handyMan.completedBookings',
        path: `${HANDY_MAN_PREFIX_PATH}/completed-bookings`,
        component: lazy(() => import('@/views/handyMan/completedBookings')),
        authority: [ADMIN],
    },
    {
        key: 'handyMan.inDispute',
        path: `${HANDY_MAN_PREFIX_PATH}/bookings-in-dispute`,
        component: lazy(() => import('@/views/handyMan/inDispute')),
        authority: [ADMIN],
    },
]

export default handyManRoute