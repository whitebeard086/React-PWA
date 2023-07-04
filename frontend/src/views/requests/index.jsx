import { injectReducer } from "store";
import reducer from "./store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequestsData, setServiceCompleted, setServiceConfirmed } from "./store/dataSlice";
import GettingData from "./components/GettingData";
import { Button } from "components/ui";
import { Link } from "react-router-dom";
import Enquiries from "./components/Enquiries";
import appConfig from "configs/app.config";
import CompleteServiceDialog from "./components/Bookings/CompleteServiceDialog";
import { useRef } from "react";
import { io } from "socket.io-client";
import Bookings from "./components/Bookings";
import ConfirmServiceDialog from "./components/Bookings/ConfirmServiceDialog";

injectReducer("requests", reducer);

const Requests = () => {
    const dispatch = useDispatch();
    const socket = useRef();
    const { socketURL } = appConfig;

    const { loading, serviceCompleted, serviceConfirmed } = useSelector(
        (state) => state.requests?.data
    );
    const { profile } = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(getRequestsData());
        socket.current = io(socketURL);
        socket.current.emit("addNewUser", profile?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
        
    // }, []);

    useEffect(() => {
        if (serviceCompleted || serviceConfirmed) {
            dispatch(getRequestsData());
        }

        if (serviceCompleted) {
            dispatch(setServiceCompleted(false))
        } else if (serviceConfirmed) {
            dispatch(setServiceConfirmed(false))
        } 

    }, [dispatch, serviceCompleted, serviceConfirmed]);

    return (
        <div className="mt-2 p-4">
            {loading ? (
                <GettingData />
            ) : (
                <div>
                    <h4>Active Bookings</h4>

                    <div className="mt-4 mb-4">
                        <Bookings />
                    </div>

                    <h4>Enquiries</h4>

                    <div className="min-h-[50vh]">
                        <Enquiries />
                    </div>
                </div>
            )}

            <div className="sticky bottom-24 flex justify-end mr-5">
                <Link to="history">
                    <Button variant="solid">Booking History</Button>
                </Link>
            </div>

            <CompleteServiceDialog socket={socket.current} />
            <ConfirmServiceDialog socket={socket.current} />
        </div>
    );
};
export default Requests;
