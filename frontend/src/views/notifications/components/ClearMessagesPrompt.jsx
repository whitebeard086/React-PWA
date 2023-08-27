import { useDispatch, useSelector } from "react-redux";
import { toggleClearMessages } from "../store/stateSlice";
import { Notification, toast } from "@/components/ui";
import { useEffect } from "react";
import { clearNotifications, setClearStatus } from "../store/dataSlice";
import { ConfirmDialog } from "@/components/shared";

const ClearMessagesPrompt = () => {
    const dispatch = useDispatch();

    const { clearMessages } = useSelector((state) => state.notifications.state)
    const { clearStatus, clearing } = useSelector((state) => state.notifications.data)

    const popNotification = (message, type, title, duration) => {
        toast.push(
            <Notification
                title={title || `${"Error"}`}
                type={type || `${"warning"}`}
                duration={duration || 3000}
            >
                {message}
            </Notification>,
            {
                placement: "top-center",
            }
        );
    };

    useEffect(() => {
        if (clearStatus === 'error') {
            popNotification(
                "Oops! Something went wrong, please try again.",
                "danger",
                "Error",
                4000
            );
        }

        if (clearStatus === 'success') {
            dispatch(toggleClearMessages(false));
        }

        dispatch(setClearStatus('idle'));
    }, [clearStatus, dispatch])

    const onClose = () => {
        dispatch(toggleClearMessages(false));
    };

    const onClear = () => {
        dispatch(clearNotifications())
    }

    return (
        <ConfirmDialog
            isOpen={clearMessages}
            onClose={onClose}
            onRequestClose={onClose}
            type="warning"
            title="Clear all Notifications"
            onCancel={onClose}
            onConfirm={onClear}
            loading={clearing}
            // confirmButtonColor="red-600"
        >
            <p>Are you sure you want to clear all notifications?</p>
        </ConfirmDialog>
    );
}
export default ClearMessagesPrompt