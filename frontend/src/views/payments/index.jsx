import { injectReducer } from "store"
import reducer from "./store"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { paymentsData } from "./store/dataSlice"
import BillsCard from "./components/BillsCard"
import PaymentsHistory from "./components/History/PaymentsHistory"

injectReducer('payments', reducer)

const Payments = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(paymentsData())
    })
    return (
        <div className="mt-2 p-4">
            <BillsCard />
            <PaymentsHistory />
        </div>
    )
}
export default Payments