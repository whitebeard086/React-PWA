import { BookingWithUserAndService } from '@/views/handyMan/types'

export type GetCommissionsResponse = {
    status: string
    serviceCommissions: BookingWithUserAndService[]
}