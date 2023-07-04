import { ConfirmDialog } from "components/shared";
import { useDispatch, useSelector } from "react-redux";
import {
    setBookingID,
    toggleCompleteServiceDialog,
} from "../../store/stateSlice";
import { completeService, setServiceCompleted, setServiceStatus } from "../../store/dataSlice";
import { useEffect } from "react";
import { Notification, toast } from "components/ui";

const CompleteServiceDialog = ({ socket }) => {
    const dispatch = useDispatch();

    const { completingService, serviceStatus, booking } = useSelector(
        (state) => state.requests.data
    );
    const { completeServiceDialog, bookingID } = useSelector(
        (state) => state.requests.state
    );

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
