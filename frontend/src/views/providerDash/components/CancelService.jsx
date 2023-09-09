import { Button, Dialog, Notification, toast } from "@/components/ui";
import useFocus from "@/views/chat/components/useFocus";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelService, getDashboardData, setCancelStatusDash } from "../store/dataSlice";
import { createNotification, setCreateStatus } from "@/views/notifications/store/dataSlice";
import { sendPushNotification } from "@/utils/sendPushNotification";
import appConfig from "@/configs/app.config";
import { setBookingID, toggleCancelServiceDialog } from "../store/stateSlice";
import { socket } from "@/utils/socket";
import TextareaAutosize from 'react-textarea-autosize';
import { motion } from 'framer-motion';

const CancelService = () => {
    const dispatch = useDispatch();
    const [reason, setReason] = useState('');
    const [reasonError, setReasonError] = useState(false);
    const [inputRef, setInputFocus] = useFocus();

    const { cancellingService, cancelStatus, booking } = useSelector((state) => state.dashboard.data)
    const { cancelServiceDialog, bookingID } = useSelector((state) => state.dashboard.state)
    const { profile } = useSelector((state) => state.auth.user);
    const { createStatus, notification } = useSelector((state) => state.notifications.data);

    const notificationData = {
		receiver_id: booking?.user_id,
		type: 'booking cancelled',
		data: JSON.stringify({
			message: `${profile?.service?.title} has cancelled this service request, your refund will be processed shortly.`,
            invoice_number: booking?.invoice?.invoice_number,
			booking_id: booking?.id,
		}),
		url: `/requests`,
	};

    const popNotification = (message, type, title, duration) => {
		toast.push(
			<Notification
				title={title || `${'Error'}`}
				type={type || `${'warning'}`}
				duration={duration || 3000}
			>
				{message}
			</Notification>,
			{
				placement: 'top-center',
			}
		);
	};

    useEffect(() => {
		if (reason.length !== 0 && reasonError) {
			setReasonError(false);
		}
	}, [reason, reasonError]);

    useEffect(() => {
        if (cancelStatus === 'error') {
            popNotification(
				'Oops! Something went wrong, please try again.',
				'danger',
				'Error',
				4000
			);

            dispatch(setCancelStatusDash('idle'))
        }

        if (cancelStatus === 'reason error') {
            popNotification(
				'Please let us know why you are cancelling this request.',
				'danger',
				'Error',
				4000
			);
        }

    }, [cancelStatus, dispatch])

    useEffect(() => {
        if (cancelStatus === 'success') {
            dispatch(createNotification(notificationData));
            sendPushNotification({
				app_id: import.meta.env.VITE_ONESIGNAL_APP_ID,
				channel_for_external_user_ids: 'push',
				include_external_user_ids: [`${booking?.user?.id}`],
				url: `${appConfig.appURL}/requests`,
				contents: {
					en: `Hello ${booking?.user?.username}, ${profile?.username} has cancelled the service #${booking?.invoice?.invoice_number}, your refund will be processed shortly.`,
				},
				content_available: true,
			});

            popNotification(
				'Service cancelled.',
				'success',
				'Success',
				8000
			);
        }

        dispatch(toggleCancelServiceDialog(false));
        dispatch(setBookingID(null));
        socket.emit('cancelledService', booking?.user?.id);
        dispatch(getDashboardData());
        dispatch(setCancelStatusDash('idle'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cancelStatus])

    useEffect(() => {
		if (createStatus === 'success') {
			socket.emit('sendNotification', [notification, booking?.user_id]);

			dispatch(setCreateStatus('idle'));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createStatus]);

    const handleChange = (e) => {
		setReason(e.target?.value);
	};

    const onCancelService = () => {
        if (reason.length < 1) {
            setReasonError(true);
            setInputFocus();
            return;
        }

        dispatch(cancelService({
            booking_id: bookingID,
            reason
        }))
    }

    const onClose = () => {
		dispatch(toggleCancelServiceDialog(false));
		dispatch(setBookingID(null));
	};

    return (
        <Dialog
            isOpen={cancelServiceDialog}
            onClose={onClose}
            onRequestClose={onClose}
            type="info"
            title="Are You Sure You Want to Cancel This Service?"
            onCancel={onClose}
            onConfirm={onCancelService}
            loading={cancellingService}
        >
            <h4 className="text-lg font-bold text-gray-700">
				You are about to cancel this request
			</h4>

            <div className="mt-4">
                <TextareaAutosize
					className="w-full block text-sm outline-none p-3 bg-gray-200 overflow-auto resize-none rounded-md border-0 active:border-0"
					onChange={handleChange}
					value={reason}
					placeholder="Kindly tell us why you want to cancel this service request."
					maxRows={10}
					minRows={5}
                    ref={inputRef}
				/>

                {reasonError && (
                    <motion.p
                        initial={{ opacity: 0, visibility: 'hidden' }}
                        animate={{ opacity: 1, visibility: 'visible' }}
                        transition={{ duration: 0.3, type: 'tween' }}
                        exit={{ opacity: 0, visibility: 'hidden' }}
                        className="text-xs text-red-500 mt-2"
                    >
                        Please kindly tell us why you are cancelling this service request
                    </motion.p>
                )}

                <div className="flex items-center gap-4 w-full justify-end mt-4">
					<Button className="!bg-white" onClick={onClose}>
						Cancel
					</Button>
					<Button
						variant="solid"
                        color="red-500"
						onClick={onCancelService}
						loading={cancellingService}
					>
						Confirm
					</Button>
				</div>
            </div>
        </Dialog>
    )
}
export default CancelService