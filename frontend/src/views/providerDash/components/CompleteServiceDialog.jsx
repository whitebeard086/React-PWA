import { ConfirmDialog } from "components/shared";
import { useDispatch, useSelector } from "react-redux";
import { completeService, setServiceCompleted, setServiceStatus } from "../store/dataSlice";
import { useEffect } from "react";
import { Notification, toast } from "components/ui";
import { sendPushNotification } from "utils/sendPushNotification";
import appConfig from "configs/app.config";
import { toggleCompleteServiceDialog } from "../store/stateSlice";

const CompleteServiceDialog = ({ socket }) => {
    const dispatch = useDispatch();

    const { completingService, serviceStatus, booking } = useSelector(
        (state) => state.dashboard.data
    );
    const { completeServiceDialog, bookingID } = useSelector(
        (state) => state.dashboard.state
    );
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
        if (serviceStatus === "error") {
            popNotification(
                "Oops! Something went wrong, please try again.",
                "danger",
                "Error",
                4000
            )
        }

        dispatch(setServiceStatus('idle'));
    }, [serviceStatus, dispatch])

    useEffect(() => {
        if (serviceStatus === "success") {
            sendPushNotification({
                app_id: process.env.REACT_APP_ONESIGNAL_APP_ID,
                channel_for_external_user_ids: "push",
                include_external_user_ids: [`${booking?.user?.id}`],
                url: `${appConfig.appURL}/chat/${profile?.username.toLowerCase()}`,
                contents: {
                    en: `Hello ${booking?.user?.username}, ${profile?.username} has completed your service, please inspect the work and confirm if you are satisfied.`,
                },
                content_available: true,
            })

            popNotification(
                "We have notified the user that booked this service that it has been completed, please wait a moment for them to confirm.",
                "success",
                "Success",
                8000
            );
        }

        dispatch(toggleCompleteServiceDialog(false));
        dispatch(setServiceStatus('idle'));
        socket?.emit("completedService", booking?.user?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serviceStatus]);

    useEffect(() => {
        socket?.on("serviceCompleted", () => {
            dispatch(setServiceCompleted(true));
        });
    }, [dispatch, socket]);

    const onClose = () => {
        dispatch(toggleCompleteServiceDialog(false));
        // dispatch(setBookingID(null))
    };

    const onComplete = () => {
        dispatch(completeService({ booking_id: bookingID }));
    };

    return (
        <ConfirmDialog
            isOpen={completeServiceDialog}
            onClose={onClose}
            onRequestClose={onClose}
            type="success"
            title="Service Completed?"
            onCancel={onClose}
            onConfirm={onComplete}
            loading={completingService}
            // confirmButtonColor="red-600"
        >
            <p>Confirm that you have successfully completed this service?</p>
        </ConfirmDialog>
    );
};
export default CompleteServiceDialog;
