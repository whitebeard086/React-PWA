import { injectReducer } from "@/store";
import reducer from "./store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "./store/dataSlice";
import NotificationList from "./components/NotificationList";
import { Loading } from "@/components/shared";
import ActionBar from "./components/ActionBar";
import ClearMessagesPrompt from "./components/ClearMessagesPrompt";

injectReducer("notifications", reducer);

const Notifications = () => {
    const dispatch = useDispatch()

    const { loading } = useSelector((state) => state.notifications.data)

    useEffect(() => {
        dispatch(getNotifications())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="mt-2 p-4">
            {loading ? (
                <div className="min-h-[60vh] grid place-content-center">
                    <Loading loading />
                </div>
            ):(
                <div>
                    <ActionBar />
                    <NotificationList />
                </div>
            )}
            <ClearMessagesPrompt />
        </div>
    )
}
export default Notifications