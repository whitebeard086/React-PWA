import { ConfirmDialog } from "components/shared";
import { Notification, toast } from "components/ui";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "store/auth/userSlice";
import { confirmService, getRequestsData, setServiceConfirmed } from "views/requests/store/dataSlice";
import { setBookingID, setConfirmService, toggleConfirmServiceDialog } from "views/requests/store/stateSlice";

const ConfirmServiceDialog = ({ socket }) => {
    const dispatch = useDispatch();

    const { confirmingService, confirmStatus, booking } = useSelector((state) => state.requests.data)
    const { confirmServiceDialog, bookingID } = useSelector((state) => state.requests.state)

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

        dispatch(setConfirmService('idle'));
    }, [confirmStatus, dispatch])

    useEffect(() => {
        if (confirmStatus === 'success') {
            popNotification(
                "Service completed and closed successfully.",
                "success",
                "Success",
                8000
            )
        }

        dispatch(toggleConfirmServiceDialog(false));
        dispatch(setConfirmService('idle'));
        dispatch(setBookingID(null))
        socket?.emit("confirmedService", booking?.service?.user?.id);
        dispatch(getRequestsData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmStatus])

    useEffect(() => {
        socket?.on("serviceConfirmed", () => {
            dispatch(getUser());
            dispatch(setServiceConfirmed(true));
        })
    }, [dispatch, socket])

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