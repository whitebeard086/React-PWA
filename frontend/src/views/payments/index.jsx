import { injectReducer } from "@/store"
import reducer from "./store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { paymentsData, setReceivedDeposit, setUpdateStatus } from "./store/dataSlice"
import PaymentsHistory from "./components/History/PaymentsHistory"
import { toggleDepositDialog } from "./store/stateSlice"
import { getUser } from "@/store/auth/userSlice"

injectReducer('payments', reducer)

const Payments = () => {
    const dispatch = useDispatch();

    const { updateStatus, receivedDeposit } = useSelector((state) => state.payments.data)
    const { depositDialog } = useSelector((state) => state.payments.state)

    useEffect(() => {
        dispatch(paymentsData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (updateStatus === 'success' || updateStatus === 'error') {
            dispatch(setUpdateStatus('idle'))
        }
    }, [dispatch, updateStatus])

    useEffect(() => {
        if (receivedDeposit) {
            dispatch(paymentsData())
            dispatch(getUser())

            if (depositDialog) {
                dispatch(toggleDepositDialog(false));
            }
        }

        dispatch(setReceivedDeposit(false))
    }, [depositDialog, dispatch, receivedDeposit])

    return (
        <div className="mt-2 p-4">
            {/* <BillsComponent /> */}
            <PaymentsHistory />
        </div>
    )
}
export default Payments