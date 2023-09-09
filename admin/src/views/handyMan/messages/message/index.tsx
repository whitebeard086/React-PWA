import { injectReducer } from "@/store"
import reducer, { useAppSelector, useAppDispatch, getEnquiry } from "../store"
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Loading } from "@/components/shared";
import Chat from "./components/Chat";
import Details from "./components/Details";

injectReducer('enquiries', reducer)

const Message = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    
    const { enquiry, loading } = useAppSelector((state) => state.enquiries.data)

    useEffect(() => {
        if(!enquiry.id) {
            dispatch(getEnquiry({ uid: pathname.split('/')[3] }))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Loading loading={loading}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Details 
                    data={enquiry}  
                    className="lg:hidden"
                />
                <Chat 
                    data={enquiry}  
                    className="col-span-2"
                />
                <Details 
                    data={enquiry}  
                    className="hidden lg:block"
                />
            </div>
        </Loading>
    )
}
export default Message