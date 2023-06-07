import { injectReducer } from "store"
import reducer from "./store"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { paymentsData } from "./store/dataSlice"

injectReducer('payments', reducer)

const Payments = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(paymentsData())
    })
    return (
        <div>
            
        </div>
    )
}
export default Payments