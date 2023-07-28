import { ConfirmDialog } from "components/shared";
import { Notification, toast } from "components/ui";
import appConfig from "configs/app.config";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { sendPushNotification } from "utils/sendPushNotification";
import { socket } from "utils/socket";
import { confirmService, getRequestsData, setConfirmStatus } from "views/requests/store/dataSlice";
import { setBookingID, toggleConfirmServiceDialog } from "views/requests/store/stateSlice";

const ConfirmServiceDialog = () => {
    const dispatch = useDispatch();

    const { confirmingService, confirmStatus, booking } = useSelector((state) => state.requests.data)
    const { confirmServiceDialog, bookingID } = useSelector((state) => state.requests.state)
    const { profile } = useSelector((state) => state.auth.user)

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
        if (confirmStatus === "error") {
            popNotification(
                "Oops! Something went wrong, please try again.",
                "danger",
                "Error",
                4000
            )
        }

        dispatch(setConfirmStatus('idle'));
    }, [confirmStatus, dispatch])

    useEffect(() => {
        if (confirmStatus === 'success') {
            sendPushNotification({
                app_id: process.env.REACT_APP_ONESIGNAL_APP_ID,
                channel_for_external_user_ids: "push",
                include_external_user_ids: [`${booking?.service?.user?.id}`],
                url: `${appConfig.appURL}/chat/${profile?.username.toLowerCase()}`,
                contents: {
                    en: `Hello ${booking?.service?.user?.username}, ${profile?.username} has confirmed the completion of this service, we have released the payment to your Taskitly account.`,
                },
                content_available: true,
            })

            popNotification(
                "Service completed and closed successfully.",
                "success",
                "Success",
                8000
            )
        }

        dispatch(toggleConfirmServiceDialog(false));
        dispatch(setBookingID(null))
        socket.emit("confirmedService", booking?.service?.user?.id);
        dispatch(getRequestsData())
        dispatch(setConfirmStatus('idle'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmStatus])

    const onConfirm = () => {
        dispatch(confirmService({ booking_id: bookingID }));
    }

    const onClose = () => {
        dispatch(toggleConfirmServiceDialog(false))
        dispatch(setBookingID(null))
    }

    return (
        <ConfirmDialog
            isOpen={confirmServiceDialog}
            onClose={onClose}
            onRequestClose={onClose}
            type="success"
            title="Are You Satisfied With The Service?"
            onCancel={onClose}
            onConfirm={onConfirm}
            loading={confirmingService}
        >
            <p>
                Do you confirm that this service has been satisfactorily completed 
                and we can go ahead and release the payment to the service provider?
            </p>
        </ConfirmDialog>
    )
}
export default ConfirmServiceDialog