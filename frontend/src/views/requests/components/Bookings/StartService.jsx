import { Notification, toast } from "@/components/ui"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setStartStatus, startService } from "../../store/dataSlice"
import { sendPushNotification } from "@/utils/sendPushNotification"
import appConfig from "@/configs/app.config"
import { toggleStartServiceDialog } from "../../store/stateSlice"
import { socket } from "@/utils/socket"
import { ConfirmDialog } from "@/components/shared"
import { createNotification, setCreateStatus } from "@/views/notifications/store/dataSlice"

const StartService = () => {
    const dispatch = useDispatch()

    const { startingService, startStatus, booking } = useSelector((state) => state.requests.data)
    const { startServiceDialog, bookingID } = useSelector((state) => state.requests.state)
    const { profile } = useSelector((state) => state.auth.user)
    const { createStatus, notification } = useSelector((state) => state.notifications.data);

    const notificationData = {
		receiver_id: booking?.user_id,
		type: 'booking start',
		data: JSON.stringify({
			message: `${profile?.service?.title} has resumed your service.`,
			booking_id: booking?.id,
		}),
		url: `/requests`,
	};

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
        if (startStatus === "error") {
            popNotification(
                "Oops! Something went wrong, please try again.",
                "danger",
                "Error",
                4000
            );
        }

        dispatch(setStartStatus("idle"));
    }, [startStatus, dispatch]);

    useEffect(() => {
        if (startStatus === "success") {
            dispatch(createNotification(notificationData));
            sendPushNotification({
                app_id: import.meta.env.VITE_ONESIGNAL_APP_ID,
                channel_for_external_user_ids: "push",
                include_external_user_ids: [`${booking?.user?.id}`],
                url: `${
                    appConfig.appURL
                }/chat/${profile?.username.toLowerCase()}`,
                contents: {
                    en: `Hello ${booking?.user?.username}, ${profile?.username} has officially resumed service, we will let you know when he is done.`,
                },
                content_available: true,
            });

            popNotification(
                "Service resumed.",
                "success",
                "Success",
                8000
            );
        }

        dispatch(toggleStartServiceDialog(false))
        dispatch(setStartStatus('idle'))
        socket.emit(
            "startedService",
            booking?.user?.id,
            console.log("Emit Service Started, Bookings: ", true)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startStatus])

    useEffect(() => {
		if (createStatus === 'success') {
			socket.emit('sendNotification', [notification, booking?.user_id]);

			dispatch(setCreateStatus('idle'));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createStatus]);

    const onClose = () => {
        dispatch(toggleStartServiceDialog(false))
    }

    const onStart = () => {
        dispatch(startService({ booking_id: bookingID }));
    };

    return (
        <ConfirmDialog
            isOpen={startServiceDialog}
            onClose={onClose}
            onRequestClose={onClose}
            type="success"
            title="Start Service?"
            onCancel={onClose}
            onConfirm={onStart}
            loading={startingService}
            // confirmButtonColor="red-600"
        >
            <p>Officially resume this service?</p>
        </ConfirmDialog>
    )
}
export default StartService