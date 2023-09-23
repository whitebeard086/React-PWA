import { Booking, Invoice, InvoiceWithItems, Service, ServiceWithUser, User } from '@/@types/common'
import { DisputeWithDetails } from '@/views/handyMan/types'

interface RecentBookingWithInvoice extends Booking {
    invoice: InvoiceWithItems
    user: User
    service: ServiceWithUser
}

interface ServiceWithBookings extends Service {
    bookings: Booking[]
}

interface RecentProviderWithBookings extends User {
    bookings: Booking[] | []
}

interface RecentProviderWithServiceAndBookings extends RecentProviderWithBookings {
    bookings: Booking[] | []
    service: ServiceWithBookings
}

export type GetHomeResponse = {
    status: string
    allBookings: string
    allClients: string
    allProviders: string
    recentProviders: RecentProviderWithServiceAndBookings[]
    recentCustomers: User[]
    recentBookings: RecentBookingWithInvoice[]
    recentDisputes: DisputeWithDetails[]
}