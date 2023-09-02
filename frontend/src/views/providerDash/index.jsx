import { injectReducer } from "@/store";
import reducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import GettingDashboardData from "./components/GettingDashboardData";
import DashboardFeed from "./components/DashboardFeed";
import CompleteServiceDialog from "./components/CompleteServiceDialog";
import {
    getDashboardData,
    setServiceCompletedDash,
    setServiceConfirmedDash,
} from "./store/dataSlice";
import { socket } from "@/utils/socket";
import StartService from "./components/StartService";
import CancelService from "./components/CancelService";
import DisputeDialog from "./components/DisputeDialog";

injectReducer("dashboard", reducer);

const ProviderDashboard = () => {
    const dispatch = useDispatch();

    const { serviceCompleted, serviceConfirmed, serviceStarted, serviceCancelled } = useSelector(
        (state) => state.dashboard.data
    );
    const { serviceBooked } = useSelector((state) => state.chat.data);
    const { loading } = useSelector((state) => state.dashboard.data);

    useEffect(() => {
        dispatch(getDashboardData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (serviceCompleted || serviceConfirmed || serviceBooked || serviceStarted || serviceCancelled) {
            dispatch(getDashboardData());
        }

        if (serviceCompleted) {
            dispatch(setServiceCompletedDash(false));
        } else if (serviceConfirmed) {
            dispatch(setServiceConfirmedDash(false));
        }
    }, [dispatch, serviceCompleted, serviceConfirmed, serviceBooked, serviceStarted, serviceCancelled]);

    return (
        <div className="mt-10 mb-8 px-4">
            {loading ? <GettingDashboardData /> : <DashboardFeed />}
            <CompleteServiceDialog socket={socket.current} />
            <StartService />
            <CancelService />
            <DisputeDialog />
        </div>
    );
};
export default ProviderDashboard;
