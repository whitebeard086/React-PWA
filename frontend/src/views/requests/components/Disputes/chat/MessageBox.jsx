import { Button, Dropdown, Notification, toast } from "@/components/ui";
import { useDropdownMenuContext } from "@/components/ui/Dropdown/context/dropdownMenuContext";
import appConfig from "@/configs/app.config";
import useCompressFile from "@/utils/hooks/useCompressFile";
import { sendPushNotification } from "@/utils/sendPushNotification";
import { socket } from "@/utils/socket";
import useFocus from "@/views/chat/components/useFocus";
import { createNotification, setCreateStatus } from "@/views/notifications/store/dataSlice";
import { sendMessage, setMessageStatus } from "@/views/requests/store/dataSlice";
import { setFile } from "@/views/requests/store/stateSlice";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";

const MessageBox = () => {
    const dispatch = useDispatch();
    const { compressFile, compressedFile, resetCompressedFile } = useCompressFile();
    // eslint-disable-next-line no-unused-vars
    const [avatarImg, setAvatarImg] = useState(null);
    const [message, setMessage] = useState("");
    const [inputRef, setInputFocus] = useFocus();
    console.log(message);

    const { file } = useSelector((state) => state.requests.state);
    const { dispute, messageStatus, sentMessage } = useSelector((state) => state.requests.data);
    const { userType, profile, onlineUsers } = useSelector((state) => state.auth.user)
    const { createStatus, notification } = useSelector((state) => state.notifications.data)
    const receiver = dispute?.booking?.service?.user?.id === profile?.id ? dispute?.booking?.user : dispute?.booking?.service?.user

    const notificationData = {
		receiver_id: receiver?.id,
		type: 'dispute message',
		data: JSON.stringify({
			message: 'New Dispute Message',
			dispute_id: dispute?.id,
		}),
		url: `/requests/disputes/${dispute?.uid}`,
	};

    const onFileUpload = (file) => {
        setAvatarImg(URL.createObjectURL(file[0]));
        compressFile(file[0], 0.15);
    };

    const handleChange = (e) => {
        setMessage(e.target?.value);
    };

    const onAddEmoji = (emojiData, e) => {
        console.log(emojiData);
        // setMessage(<Emoji unified={emojiData.unified} />)
        setMessage((prev) => prev + emojiData.emoji)
    }

    const onSendMessage = () => {
        const popNotification = () => {
            toast.push(
                <Notification
                    title={`${"Error"}`}
                    type={`${"warning"}`}
                    duration={3000}
                >
                    {"Please enter a message..."}
                </Notification>,
                {
                    placement: "top-center",
                }
            );
        };

        if (message.length < 1) {
            popNotification();
            setInputFocus();
            return;
        }

        dispatch(
            sendMessage({
                dispute_id: dispute?.id,
                sender_id: profile?.id,
                media: compressedFile,
                message: message,
            })
        );

        dispatch(setFile({}));
        setMessage("");
        resetCompressedFile();
    };

    useEffect(() => {
        if (messageStatus === "success") {
            dispatch(createNotification(notificationData));
            sendPushNotification({
                app_id: import.meta.env.VITE_ONESIGNAL_APP_ID,
                channel_for_external_user_ids: "push",
                include_external_user_ids: [`${receiver?.id}`],
                url: `${appConfig.appURL}/requests/disputes/${dispute?.uid}`,
                contents: {
                    en: `New update on your dispute with ${receiver?.service?.title ? receiver?.service?.title : `${receiver?.first_name} ${receiver?.last_name}`}`,
                },
                content_available: true,
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageStatus])

    useEffect(() => {
        if (messageStatus !== "idle") {
            dispatch(setMessageStatus("idle"));
        }
    }, [dispatch, messageStatus]);

    useEffect(() => {
		if (createStatus === 'success') {
			socket.emit('sendNotification', [notification, receiver?.id]);

			dispatch(setCreateStatus('idle'));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createStatus]);

    return (
        <div className="flex items-center gap-2">
            <TextareaAutosize
                className="w-full block text-sm outline-none p-3 bg-gray-100 overflow-auto resize-none rounded-md border-0 active:border-0"
                onChange={handleChange}
                value={message}
                placeholder="Type here..."
                maxRows={6}
                minRows={1}
                ref={inputRef}
            />

            <div className="hover:bg-emerald-50 hover:shadow-md cursor-pointer transition duration-300 w-8 h-8 flex items-center justify-center rounded-full">
                <Dropdown
                    placement="top-end"
                    renderTitle={<BsEmojiSmile className="text-2xl" />}
                >
                    <Dropdown.Item variant="header">
                        <EmojiPicker  
                            onEmojiClick={onAddEmoji}
                        />
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    )
}
export default MessageBox