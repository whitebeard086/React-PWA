import { useEffect, useState } from "react";

const useInvoiceData = (invoiceData) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const sum = invoiceData?.reduce((total, item) => total + Number(item.price), 0)
            setTotalPrice(sum)
        }

        calculateTotalPrice();
    }, [invoiceData])

    return {
        totalPrice,
    }
}
export default useInvoiceData