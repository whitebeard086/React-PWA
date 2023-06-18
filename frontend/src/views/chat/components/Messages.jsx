import { EllipsisButton } from "components/shared";
import { Avatar, Card, Dropdown, Image, Notification, toast } from "components/ui"
import appConfig from "configs/app.config";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsReplyFill } from "react-icons/bs"
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux"
import { deleteMessage, removeMessage, setDeleteMessageStatus } from "../store/dataSlice";
import { useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion'

const Messages = () => {
    const dispatch = useDispatch();
    const { imagePath } = appConfig;

    const { messages, provider, deleteMessageStatus } = useSelector((state) => state.chat.data)
    
    const onRemoveMessage = (message) => {
        dispatch(deleteMessage({ message_id: message.id }))
    }

    useEffect(() => {
        const popNotification = () => {
            toast.push(
                <Notification
                    title={`${deleteMessageStatus === "success" ? "Success" : "Error"}`}
                    type={`${deleteMessageStatus === "success" ? "success" : "danger"}`}
                    duration={3000}
                >
                    {deleteMessageStatus === "success" ? "Message deleted successfully!" : "Looks like something went wrong, please try again."}
                </Notification>,
                {
                    placement: "top-center",
                }
            );
        };

        if (deleteMessageStatus !== 'idle') {
            popNotification()
        }

        dispatch(setDeleteMessageStatus('idle'))
    }, [deleteMessageStatus, dispatch])

    return (
        <AnimatePresence>
            {messages?.map((message) => (
                <motion.div 
                    key={message.id}
                    initial={{ opacity: 0, visibility: 'hidden' }}
                    animate={{opacity: 1, visibility: 'visible'}}
                    transition={{ duration: 1, type: 'tween' }}
                    exit={{ opacity: 0, visibility: 'hidden' }}
                    className="flex justify-end gap-2 items-start"
                >
                    <div className="mb-4 max-w-[80%] w-fit">
                        <Card className="max-w-[100%] w-fit bg-primary-500 text-white">
                            <div className="flex gap-2">
                                {message.message && (
                                    <p>
                                        {message.message}
                                    </p>
                                )}
                                {message.file && (
                                    <Image 
                                        src={`${imagePath}/${message.file}`} 
                                        alt="" 
                                    />
                                )}
                                <Dropdown placement="top-end" renderTitle={<EllipsisButton icon={<BiDotsVerticalRounded className="text-white" />} variant="twoTone" shape="round" />}>
                                    <Dropdown.Item eventKey="Reply" style={{justifyContent: "flex-start"}}>
                                        <span><BsReplyFill className="text-lg" /></span>
                                        <span>Reply</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="Delete" onClick={() => onRemoveMessage(message)} style={{justifyContent: "flex-start"}}>
                                        <span><MdDelete className="text-lg" /></span>
                                        <span>Delete</span>
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                        </Card>
                        <div>
                            <p className="text-left">8:02 PM</p>
                        </div>
                    </div>
                    <div>
                        <Avatar src={`${imagePath}/${provider?.image}`} size="sm" shape="circle" />
                    </div>
                </motion.div>
            ))} 
        </AnimatePresence>
    )
}
export default Messages