import { lazy } from 'react'
import { FINANCE_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const financeRoute: Routes = [
    {
        key: 'finance.deposits',
        path: `${FINANCE_PREFIX_PATH}/deposits`,
        component: lazy(() => import('@/views/finance/deposits')),
        authority: [ADMIN],
    },
    {
        key: 'finance.billPayments',
        path: `${FINANCE_PREFIX_PATH}/bill-payments`,
        component: lazy(() => import('@/views/finance/billPayments')),
        authority: [ADMIN],
    },
    {
        key: 'finance.servicePayments',
        path: `${FINANCE_PREFIX_PATH}/service-payments`,
        component: lazy(() => import('@/views/finance/servicePayments')),
        authority: [ADMIN],
    },
    {
        key: 'finance.referralRewards',
        path: `${FINANCE_PREFIX_PATH}/referral-rewards`,
        component: lazy(() => import('@/views/finance/referralRewards')),
        authority: [ADMIN],
    },
    {
        key: 'finance.withdrawals',
        path: `${FINANCE_PREFIX_PATH}/withdrawals`,
        component: lazy(() => import('@/views/finance/withdrawals')),
        authority: [ADMIN],
    },
    {
        key: 'finance.systemCommissions',
        path: `${FINANCE_PREFIX_PATH}/system-commissions`,
        component: lazy(() => import('@/views/finance/systemCommissions')),
        authority: [ADMIN],
    },
]

export default financeRoute