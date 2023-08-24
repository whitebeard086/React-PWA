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

injectReducer("dashboard", reducer);

const ProviderDashboard = () => {
    const dispatch = useDispatch();

    const { serviceCompleted, serviceConfirmed } = useSelector(
        (state) => state.dashboard.data
    );
    const { serviceBooked } = useSelector((state) => state.chat.data);
    const { loading } = useSelector((state) => state.dashboard.data);

    useEffect(() => {
        dispatch(getDashboardData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (serviceCompleted || serviceConfirmed || serviceBooked) {
            dispatch(getDashboardData());
        }

        if (serviceCompleted) {
            dispatch(setServiceCompletedDash(false));
        } else if (serviceConfirmed) {
            dispatch(setServiceConfirmedDash(false));
        }
    }, [dispatch, serviceCompleted, serviceConfirmed, serviceBooked]);

    return (
        <div className="mt-10 mb-8 px-4">
            {loading ? <GettingDashboardData /> : <DashboardFeed />}
            <CompleteServiceDialog socket={socket.current} />
        </div>
    );
};
export default ProviderDashboard;
