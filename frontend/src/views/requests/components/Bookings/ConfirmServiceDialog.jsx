import { Button, Dialog, Notification, toast } from "@/components/ui";
import appConfig from "@/configs/app.config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendPushNotification } from "@/utils/sendPushNotification";
import { socket } from "@/utils/socket";
import {
    confirmService,
    getRequestsData,
    setConfirmStatus,
} from "../../store/dataSlice";
import { setBookingID, toggleConfirmServiceDialog } from "../../store/stateSlice";
import { Rating } from '@smastrom/react-rating';
import TextareaAutosize from "react-textarea-autosize";
import { motion } from "framer-motion";

const ConfirmServiceDialog = () => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [ratingError, setRatingError] = useState(false);
    const [comment, setComment] = useState("");

    console.log(comment);

    const { confirmingService, confirmStatus, booking } = useSelector(
        (state) => state.requests.data
    );
    const { confirmServiceDialog, bookingID } = useSelector(
        (state) => state.requests.state
    );
    const { profile } = useSelector((state) => state.auth.user);

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
        if (rating !== 0 && ratingError) {
            setRatingError(false);
        }
    }, [rating, ratingError])

    useEffect(() => {
        if (confirmStatus === "error") {
            popNotification(
                "Oops! Something went wrong, please try again.",
                "danger",
                "Error",
                4000
            );
        }

        if (confirmStatus === "rating error") {
            popNotification(
                "Please kindly leave a rating and try again.",
                "danger",
                "Error",
                4000
            );
        }

        dispatch(setConfirmStatus("idle"));
    }, [confirmStatus, dispatch]);

    useEffect(() => {
        if (confirmStatus === "success") {
            sendPushNotification({
                app_id: import.meta.env.VITE_ONESIGNAL_APP_ID,
                channel_for_external_user_ids: "push",
                include_external_user_ids: [`${booking?.service?.user?.id}`],
                url: `${
                    appConfig.appURL
                }/chat/${profile?.username.toLowerCase()}`,
                contents: {
                    en: `Hello ${booking?.service?.user?.username}, ${profile?.username} has confirmed the completion of this service, we have released the payment to your Taskitly account.`,
                },
                content_available: true,
            });

            popNotification(
                "Service completed and closed successfully.",
                "success",
                "Success",
                8000
            );
        }

        dispatch(toggleConfirmServiceDialog(false));
        dispatch(setBookingID(null));
        socket.emit("confirmedService", booking?.service?.user?.id);
        dispatch(getRequestsData());
        dispatch(setConfirmStatus("idle"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmStatus]);

    const onConfirm = () => {
        if (rating === 0) {
            setRatingError(true);
            return;
        }

        dispatch(confirmService({ 
            booking_id: bookingID,
            rating,
            comment,
        }));
    };

    const handleChange = (e) => {
        setComment(e.target?.value);
    };

    const onClose = () => {
        dispatch(toggleConfirmServiceDialog(false));
        dispatch(setBookingID(null));
    };

    return (
        <Dialog
            isOpen={confirmServiceDialog}
            onClose={onClose}
            onRequestClose={onClose}
            type="success"
            title="Are You Satisfied With This Service?"
            onCancel={onClose}
            onConfirm={onConfirm}
            loading={confirmingService}
        >
            <h4 className="text-lg font-bold text-gray-700">You are about to release payment</h4>

            <p className="text-base mt-4 text-gray-700">
                By clicking on <i>&quot;Confirm&quot;</i>, it means the service
                provider has completed their task for you, and you consider the 
                service rendered.
            </p>

            <div className="flex flex-col gap-4">
                <h4 className="text-lg font-bold text-gray-700 mt-4">Kindly help us rate {booking?.service?.title} and leave a comment.</h4>
                <div>
                    <Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} />
                    {ratingError && (
                        <motion.p 
                            initial={{ opacity: 0, visibility: "hidden" }}
                            animate={{ opacity: 1, visibility: "visible" }}
                            transition={{ duration: 0.3, type: "tween" }}
                            exit={{ opacity: 0, visibility: "hidden" }}
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
                        Only Taskitly team can see this comment, it is not published to the general public.
                    </p>
                    <p className="text-xs text-red-500 italic">
                        This is to help us ensure proper service providers are on the platform.
                    </p>
                </div>
                <div className="flex items-center gap-4 w-full justify-end">
                    <Button
                        className="!bg-white"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        onClick={onConfirm}
                        loading={confirmingService}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};
export default ConfirmServiceDialog;
