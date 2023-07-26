import { injectReducer } from "store/index";
import reducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "./store/dataSlice";
import { useEffect } from "react";
import GettingDashboardData from "./components/GettingDashboardData";
import DashboardFeed from "./components/DashboardFeed";
import CompleteServiceDialog from "./components/CompleteServiceDialog";
import { useRef } from "react";
import appConfig from "configs/app.config";
import { io } from "socket.io-client";

injectReducer("dashboard", reducer);

const ProviderDashboard = () => {
    const dispatch = useDispatch();
    const socket = useRef();
    const { socketURL } = appConfig;

    const { loading } = useSelector((state) => state.dashboard.data)
    const { profile } = useSelector((state) => state.auth.user);
    // const loading = true

    useEffect(() => {
        dispatch(getDashboardData())
        socket.current = io(socketURL);
        socket.current.emit("addNewUser", profile?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    return (
        <div className="mt-10 mb-8 px-4">
            {loading ? (
                <GettingDashboardData />
            ) : (
                <DashboardFeed />
            )}
            <CompleteServiceDialog socket={socket.current} />
        </div>
    )
}
export default ProviderDashboard