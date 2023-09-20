import { InvoiceWithItems } from './messages/store/enquiriesSlice';
import { Booking, Category, Dispute, DisputeMessage, Media, Service, User } from '@/@types/common'

export interface ServiceWithCategory extends Service {
    category: Category
}

export interface UserWithService extends User {
    service: ServiceWithCategory | null
}

export interface BookingWithUser extends Booking {
    user: User
}

export interface DisputeMessageWithMedia extends DisputeMessage {
    media: Media[] | null
}

export interface DisputeWithDetails extends Dispute {
    invoice: InvoiceWithItems
    client: User
    provider: UserWithService
    disputer: UserWithService
    booking: BookingWithUser
    messages: DisputeMessageWithMedia[] | null
}

export interface GetDisputesResponse {
    status: string
    disputes: DisputeWithDetails[]
}

export type GetDisputeRequest = {
    uid: string
}

export interface GetDisputeResponse {
    status: string
    dispute: DisputeWithDetails
}

export interface RefundClientResponse {
    status: string
}