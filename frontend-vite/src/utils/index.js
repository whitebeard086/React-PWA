export const formatNumber = (x, y) => {
    return x.toLocaleString(undefined, {
        minimumFractionDigits: y,
        maximumFractionDigits: y
    })
}