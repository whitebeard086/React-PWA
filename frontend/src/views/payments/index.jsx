import { injectReducer } from "store"
import reducer from "./store"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { paymentsData } from "./store/dataSlice"
import PaymentsHistory from "./components/History/PaymentsHistory"
import BillsComponent from "./components/Bills/BillsComponent"

injectReducer('payments', reducer)

const Payments = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(paymentsData())
    })
    return (
        <div className="mt-2 p-4">
            {/* <BillsComponent /> */}
            <PaymentsHistory />
        </div>
    )
}
export default Payments