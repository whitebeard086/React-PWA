import { useEffect, useState } from "react";

const useTaskitly = (amount) => {
    const [taskitlyCut, setTaskitlyCut] = useState(0);
    const [userCut, setUserCut] = useState(0);

    useEffect(() => {
        setTaskitlyCut(amount * 0.05);
        setUserCut(amount * 0.95);
    }, [amount]);

    return [taskitlyCut, userCut];
};

export const useAverageRating = (service) => {
    const bookings = service?.bookings

    const calculateAverageRating = (ratings) => {
        if (ratings?.length === 0) return 0;
    
        const totalRating = ratings?.reduce((sum, rating) => sum + rating?.rating, 0);
        return totalRating / ratings?.length;
    };

    const averageRating = calculateAverageRating(bookings);

    return {averageRating};

    
}

export default useTaskitly;
