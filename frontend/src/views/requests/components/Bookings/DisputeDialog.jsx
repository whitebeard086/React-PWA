import { Button, Dialog, Notification, toast } from "@/components/ui";
import useFocus from "@/views/chat/components/useFocus";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequestsData, openDispute, setDisputeStatus } from "../../store/dataSlice";
import { createNotification, setCreateStatus } from "@/views/notifications/store/dataSlice";
import { sendPushNotification } from "@/utils/sendPushNotification";
import appConfig from "@/configs/app.config";
import { setBookingID, toggleOpenDisputeDialog } from "../../store/stateSlice";
import { socket } from "@/utils/socket";
import TextareaAutosize from 'react-textarea-autosize';
import { motion } from 'framer-motion';

const DisputeDialog = () => {
    const dispatch = useDispatch();
    const [reason, setReason] = useState('');
    const [reasonError, setReasonError] = useState(false);
    const [inputRef, setInputFocus] = useFocus();

    const { openingDispute, disputeStatus, booking, dispute } = useSelector((state) => state.requests.data)
    const { openDisputeDialog, bookingID } = useSelector((state) => state.requests.state)
    const { profile } = useSelector((state) => state.auth.user);
    const { createStatus, notification } = useSelector((state) => state.notifications.data);

    let receiver;

    if (booking?.user?.id === profile?.id) {
        receiver = booking?.service?.user
    } else if (booking?.service?.user?.id === profile?.id) {
        receiver = booking?.user
    }

    const notificationData = {
		receiver_id: receiver?.id,
		type: 'booking disputed',
		data: JSON.stringify({
			message: `${profile?.service?.title ? profile?.service?.title : `${profile?.first_name} ${profile?.last_name}`} has opened dispute on the service request #${booking?.invoice?.invoice_number}, you have 24hrs to respond.`,
            invoice_number: booking?.invoice?.invoice_number,
			booking_id: booking?.id,
		}),
		url: `/requests/disputes/${dispute?.id}`,
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
        if (disputeStatus === 'error') {
            popNotification(
				'Oops! Something went wrong, please try again.',
				'danger',
				'Error',
				4000
			);

            dispatch(setDisputeStatus('idle'))
        }

        if (disputeStatus === 'reason error') {
            popNotification(
				'Please let us know why you want to lodge a complaint.',
				'danger',
				'Error',
				4000
			);

            dispatch(setDisputeStatus('idle'))
        }
    }, [dispatch, disputeStatus])

    useEffect(() => {
        if (disputeStatus === 'success') {
            dispatch(createNotification(notificationData));
            sendPushNotification({
				app_id: import.meta.env.VITE_ONESIGNAL_APP_ID,
				channel_for_external_user_ids: 'push',
				include_external_user_ids: [`${receiver?.id}`],
				url: `${appConfig.appURL}/requests/disputes/${dispute?.id}`,
				contents: {
					en: `${profile?.service?.title ? profile?.service?.title : `${profile?.first_name} ${profile?.last_name}`} has opened dispute on the service request #${booking?.invoice?.invoice_number}, you have 24hrs to respond.`,
				},
				content_available: true,
			});

            popNotification(
				'Service in dispute.',
				'success',
				'Success',
				8000
			);
        }

        dispatch(toggleOpenDisputeDialog(false));
        dispatch(setBookingID(null));
        socket.emit('openedDispute', receiver?.id);
        dispatch(getRequestsData());
        dispatch(setDisputeStatus('idle'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disputeStatus])

    useEffect(() => {
		if (createStatus === 'success') {
			socket.emit('sendNotification', [notification, receiver?.id]);

			dispatch(setCreateStatus('idle'));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createStatus]);

    const handleChange = (e) => {
		setReason(e.target?.value);
	};

    const onOpenDispute = () => {
        if (reason.length < 1) {
            setReasonError(true);
            setInputFocus();
            return;
        }

        dispatch(openDispute({
            booking_id: bookingID,
            reason
        }))
    }

    const onClose = () => {
		dispatch(toggleOpenDisputeDialog(false));
		dispatch(setBookingID(null));
	};

    return (
        <Dialog
            isOpen={openDisputeDialog}
            onClose={onClose}
            onRequestClose={onClose}
            type="info"
            title="Are You Sure You Want to Report This Service Request?"
            onCancel={onClose}
            onConfirm={onOpenDispute}
            loading={openingDispute}
        >
            <h4 className="text-lg font-bold text-gray-700">
				You are about to report this service request
			</h4>

            <div className="mt-4">
                <TextareaAutosize
					className="w-full block text-sm outline-none p-3 bg-gray-200 overflow-auto resize-none rounded-md border-0 active:border-0"
					onChange={handleChange}
					value={reason}
					placeholder="Kindly tell us what you are dissatisfied about."
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
                        Please kindly tell us what you are dissatisfied about
                    </motion.p>
                )}

                <div className="flex items-center gap-4 w-full justify-end mt-4">
					<Button className="!bg-white" onClick={onClose}>
						Cancel
					</Button>
					<Button
						variant="solid"
                        color="red-500"
						onClick={onOpenDispute}
						loading={openingDispute}
					>
						Confirm
					</Button>
				</div>
            </div>
        </Dialog>
    )
}
export default DisputeDialog