import { useEffect } from 'react'
import { injectReducer } from "@/store"
import reducer, { getEnquiries, useAppDispatch, useAppSelector } from "./store"
import Enquiries from './components/enquiries'

injectReducer('enquiries', reducer)

const Messages = () => {
    const dispatch = useAppDispatch();

    const { loading } = useAppSelector((state) => state.enquiries.data)

    useEffect(() => {
        dispatch(getEnquiries())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <Enquiries />
        </div>
    )
}
export default Messages