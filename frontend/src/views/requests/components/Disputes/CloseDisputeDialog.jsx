import { popNotification } from '@/utils/toast';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeDispute, setCloseDisputeStatus, toggleCloseDisputeDialog } from '../../store';
import { createNotification, setCreateStatus } from '@/views/notifications/store/dataSlice';
import { sendPushNotification } from '@/utils/sendPushNotification';
import appConfig from '@/configs/app.config';
import { socket } from '@/utils/socket';
import { Button, Dialog } from '@/components/ui';
import { motion } from 'framer-motion';
import { Rating } from '@smastrom/react-rating';
import TextareaAutosize from 'react-textarea-autosize';

const CloseDisputeDialog = () => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
	const [ratingError, setRatingError] = useState(false);
	const [comment, setComment] = useState('');

    const { dispute, closingDispute, closeDisputeStatus } = useSelector((state) => state.requests.data)
    const { closeDisputeDialog } = useSelector((state) => state.requests.state)
    const { profile } = useSelector((state) => state.auth.user);
    const { createStatus, notification } = useSelector((state) => state.notifications.data);

    const notificationData = {
		receiver_id: dispute?.provider?.id,
		type: 'booking complete',
		data: JSON.stringify({
			message: `${profile?.client?.first_name} ${profile?.client?.last_name} has closed the dispute for service #${dispute?.booking?.invoice?.invoice_number}, we have released the payment to your Taskitly account.`,
			// booking_id: booking?.id,
		}),
		url: `/requests`,
	};

    useEffect(() => {
		if (rating !== 0 && ratingError) {
			setRatingError(false);
		}
	}, [rating, ratingError]);

    useEffect(() => {
        if (closeDisputeStatus === 'error') {
            popNotification(
                'Error',
                'Oops! Something went wrong, please try again.',
                'danger'
            )
        }

        dispatch(setCloseDisputeStatus('idle'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [closeDisputeStatus])

    useEffect(() => {
        if (closeDisputeStatus === 'success') {
            dispatch(createNotification(notificationData));
            sendPushNotification({
                app_id: import.meta.env.VITE_ONESIGNAL_APP_ID,
                channel_for_external_user_ids: "push",
                include_external_user_ids: [`${dispute?.provider?.id}`],
                url: `${
                    appConfig.appURL
                }/requests}`,
                contents: {
                    en: `Hello ${dispute?.provider?.username}, ${profile?.username} has closed the dispute for service #${dispute?.booking?.invoice?.invoice_number}, we have released the payment to your Taskitly account.`,
                },
                content_available: true,
            });

            popNotification(
                'Success',
                'Dispute Closed.',
                'success'
            )
        }

        dispatch(toggleCloseDisputeDialog(false))
        dispatch(setCloseDisputeStatus('idle'))
        socket.emit('confirmedService', dispute?.provider?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [closeDisputeStatus])

    useEffect(() => {
		if (createStatus === 'success') {
			socket.emit('sendNotification', [notification, dispute?.provider?.id]);

			dispatch(setCreateStatus('idle'));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createStatus]);

    const onClose = () => {
        dispatch(toggleCloseDisputeDialog(false))
    }

    const onCloseDispute = () => {
        if (rating === 0) {
			setRatingError(true);
			return;
		}

        dispatch(closeDispute({ 
            DUID: dispute?.uid,
            rating,
            comment,
        }))
    }

    const handleChange = (e) => {
		setComment(e.target?.value);
	};

    return (
        <Dialog
            isOpen={closeDisputeDialog}
            onClose={onClose}
			onRequestClose={onClose}
			type="success"
            title="Close Dispute?"
			onCancel={onClose}
			onConfirm={onCloseDispute}
			loading={closeDisputeStatus}
        >
            <h4 className="text-lg font-bold text-gray-700">
				You are about to release payment
			</h4>

            <p className="text-base mt-4 text-gray-700">
				By clicking on <i>&quot;Confirm&quot;</i>, it means the service provider
				has completed their task for you, and you consider the service rendered.
			</p>

            <div className="flex flex-col gap-4">
				<h4 className="text-lg font-bold text-gray-700 mt-4">
					Kindly help us rate {dispute?.provider?.service?.title} and leave a comment.
				</h4>
				<div>
					<Rating
						style={{ maxWidth: 250 }}
						value={rating}
						onChange={setRating}
					/>
					{ratingError && (
						<motion.p
							initial={{ opacity: 0, visibility: 'hidden' }}
							animate={{ opacity: 1, visibility: 'visible' }}
							transition={{ duration: 0.3, type: 'tween' }}
							exit={{ opacity: 0, visibility: 'hidden' }}
							className="text-xs text-red-500 mt-2"
						>
							Please kindly rate this service
						</motion.p>
					)}
				</div>
				<TextareaAutosize
					className="w-full block text-sm outline-none p-3 bg-gray-100 overflow-auto resize-none rounded-md border-0 active:border-0"
					onChange={handleChange}
					value={comment}
					placeholder="Your comment on the service provider and the service they rendered."
					maxRows={10}
					minRows={5}
				/>
				<div>
					<p className="text-xs text-gray-700 italic">
						Only Taskitly team can see this comment, it is not published to the
						general public.
					</p>
					<p className="text-xs text-red-500 italic">
						This is to help us ensure proper service providers are on the
						platform.
					</p>
				</div>
				<div className="flex items-center gap-4 w-full justify-end">
					<Button className="!bg-white" onClick={onClose}>
						Cancel
					</Button>
					<Button
						variant="solid"
						onClick={onCloseDispute}
						loading={closingDispute}
					>
						Confirm
					</Button>
				</div>
			</div>
        </Dialog>
    )
}
export default CloseDisputeDialog