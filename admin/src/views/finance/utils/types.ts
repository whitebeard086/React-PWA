import { Referral } from '@/@types/common'
import { BookingWithUserAndService } from '@/views/handyMan/types'

export type GetCommissionsResponse = {
    status: string
    serviceCommissions: BookingWithUserAndService[]
}

export type ReferralRewardsResponse = {
    status: string
    referrals: Referral[]
}