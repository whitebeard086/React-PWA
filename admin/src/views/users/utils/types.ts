import { AccountLevel, Booking, Category, Service, User } from '@/@types/common'

export interface UserWithBookings extends User {
    bookings: Booking[] | []
    account_level: AccountLevel
}

interface ServiceWithCategoryAndBookings extends Service {
    category: Category
    bookings: Booking[]
}

export interface UserWithService extends User {
    service: ServiceWithCategoryAndBookings
    account_level: AccountLevel
}

export type GetUsersResponse = {
    status: string
    allClients: UserWithBookings[]
    allProviders: UserWithService[]
}