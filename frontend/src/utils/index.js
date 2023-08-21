export const formatNumber = (x, y) => {
    return x.toLocaleString(undefined, {
        minimumFractionDigits: y,
        maximumFractionDigits: y
    })
}

export const calculateAverageRating = (ratings) => {
    if (ratings?.length === 0) return 0;

    const totalRating = ratings?.reduce((sum, rating) => sum + rating?.rating, 0);
    return totalRating / ratings?.length;
};