import reducer from "./store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getRequestsData,
    setServiceCompleted,
    setServiceConfirmed,
} from "./store/dataSlice";
import GettingData from "./components/GettingData";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";
import Enquiries from "./components/Enquiries";
import CompleteServiceDialog from "./components/Bookings/CompleteServiceDialog";
import Bookings from "./components/Bookings";
import ConfirmServiceDialog from "./components/Bookings/ConfirmServiceDialog";
import {
    setBookingID,
    toggleCompleteServiceDialog,
    toggleConfirmServiceDialog,
} from "./store/stateSlice";
import { injectReducer } from "@/store";
import { socket } from "@/utils/socket";
import appConfig from "@/configs/app.config";

injectReducer("requests", reducer);

const Requests = () => {
    const dispatch = useDispatch();
    const { imagePath } = appConfig

    const { bookings, booking, completingService, confirmingService } =
        useSelector((state) => state.requests.data);
    const { bookingID } = useSelector((state) => state.requests.state);
    const { userType, profile } = useSelector((state) => state.auth.user);
    const isProvider = userType === "Provider" ? true : false;

    const { loading, serviceCompleted, serviceConfirmed } = useSelector(
        (state) => state.requests?.data
    );

    // useEffect(() => {
    //     dispatch(getRequestsData());
    //     socket.emit("addNewUser", profile?.id);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    window.OneSignal = window.OneSignal || [];
    const OneSignal = window.OneSignal;

    OneSignal.push(() => {
        OneSignal.init({
            appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
            safari_web_id: import.meta.env.VITE_ONESIGNAL_SAFARI_WEB_ID,
            allowLocalhostAsSecureOrigin: true,
            autoResubscribe: true,
        });
    });

    useEffect(() => {
        if (serviceCompleted || serviceConfirmed) {
            dispatch(getRequestsData());
        }

        if (serviceCompleted) {
            dispatch(setServiceCompleted(false));
        } else if (serviceConfirmed) {
            dispatch(setServiceConfirmed(false));
        }
    }, [dispatch, serviceCompleted, serviceConfirmed]);

    const onComplete = (booking) => {
        dispatch(toggleCompleteServiceDialog(true));
        dispatch(setBookingID(booking?.id));
    };

    const onConfirm = (booking) => {
        dispatch(toggleConfirmServiceDialog(true));
        dispatch(setBookingID(booking?.id));
    };

    return (
        <div className="mt-2 p-4">
            {loading ? (
                <GettingData />
            ) : (
                <div>
                    <h4>Active Bookings</h4>

                    <div className="mt-4 mb-4">
                        <Bookings
                            imagePath={imagePath}
                            bookings={bookings}
                            booking={booking}
                            completingService={completingService}
                            confirmingService={confirmingService}
                            bookingID={bookingID}
                            isProvider={isProvider}
                            onComplete={onComplete}
                            onConfirm={onConfirm}
                        />
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
