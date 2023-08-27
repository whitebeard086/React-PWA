import { Booking } from "@/@types/common";

export const calculateAverageRating = (bookings: Booking[] | undefined): number => {
    if (bookings?.length === 0) return 0;

    const totalRating = bookings?.reduce((sum, booking) => sum + booking?.rating, 0) || 0;
    return totalRating / (bookings?.length || 1);
};