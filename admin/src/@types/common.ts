import { ReactNode, CSSProperties } from 'react'

export interface CommonProps {
    className?: string
    children?: ReactNode
    style?: CSSProperties
}

export type TableQueries = {
    total?: number
    pageIndex?: number
    pageSize?: number
    query?: string
    sort?: {
        order: 'asc' | 'desc' | ''
        key: string | number
    }
}

export interface User {
    id: number
    role_id: number
    profile_type_id: number
    username: string
    last_name: string
    first_name: string
    image: string | null
    slug: string
    balance: number
    bank: string | null
    virtual_acc: number | null
    email: string 
    email_verified_at: Date | null
    phone: number | null
    phone_verified_at: Date | null
    created_at: Date
    updated_at: Date
    profile_views: number
    deactivate_at: Date | null
    pending_account_level: string | null
    account_level_id: number

}

export interface Booking {
    id: number
    service_id: number
    user_id: number
    invoice_id: number
    service_status: 'ongoing' | 'completed' | 'disputed' | 'refunded'
    user_status: 'ongoing' | 'completed' | 'disputed' | 'refunded'
    status: 'ongoing' | 'completed' | 'disputed' | 'refunded'
    created_at: Date
    updated_at: Date
    provider_id: number
    rating: number
    comment: string
}

export interface Invoice {
    id: number
    chat_id: number
    receiver_id: number
    invoice_number: string
    price: number
    file: string
    status: 'pending' | 'paid' | 'cancelled'
    created_at: Date
    updated_at: Date
}

export interface InvoiceItem {
    id: number
    invoice_id: number
    item: string
    price: number
    created_at: Date
    updated_at: Date
}

export interface Service {
    id: number
    uid: string | null
    user_id: number
    category_id: number
    sub_category_id: number
    workdays_id: number
    title: string
    banner: string
    slug: string
    description: string
    starting_price: number
    created_at: Date
    updated_at: Date
}

export interface Category {
    id: number
    name: string
    banner: string | null
    icon: string
    slug: string
    description: string | null
    created_at: Date
    updated_at: Date
}

export interface Chat {
    id: number
    uid: string | null
    user_id: number
    receiver_id: number
    created_at: Date
    updated_at: Date
}

export interface Message {
    id: number
    chat_id: number
    sender_id: number
    message: string | null
    file: string | null
    invoice: string | null
    created_at: Date
    updated_at: Date
}

export interface Dispute {
    id: number
    uid: string
    booking_id: number
    disputer_id: number
    client_id: number
    provider_id: number
    invoice_id: number
    description: string
    status: 'open' | 'resolved'
    respond_before: Date
    created_at: Date
    updated_at: Date
}

export interface DisputeMessage {
    id: number
    dispute_id: number
    sender_id: number
    message: string
    created_at: Date
    updated_at: Date
}

export interface Media {
    id: number
    file: string
    mediaable_type: string
    mediaable_id: number
    created_at: Date
    updated_at: Date
}