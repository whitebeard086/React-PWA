import { injectReducer } from "@/store";
import reducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOperators } from "./store/dataSlice";
import Operators from "./components/Operators";
import { Loading } from "@/components/shared";

injectReducer("airtime", reducer);

const Airtime = () => {
    const dispatch = useDispatch();

    const { gettingOperators } = useSelector((state) => state.airtime.data)

    useEffect(() => {
        dispatch(getOperators())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="mt-2 p-4">
            <div>
                {gettingOperators ? (
                    <div className="h-[10vh]">
                        <Loading size={32} loading={true} />
                    </div>
                ) : (
                    <Operators />
                )}
                
            </div>
        </div>
    )
}
export default Airtime