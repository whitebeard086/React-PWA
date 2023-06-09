import { useSelector } from "react-redux"
import GettingData from "./GettingData"
import Data from "./Data"

const PaymentsHistory = () => {
    const { verifying } = useSelector((state) => state.payments.data)

    return (
        <div className="mt-2 mb-2">
            <h4 className="text-lg font-bold text-gray-700 mb-2">Payments History</h4>

            {verifying ? (
                <GettingData />
            ):(
                <Data />
            )}
        </div>
    )
}
export default PaymentsHistory