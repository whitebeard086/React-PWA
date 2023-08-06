import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import classNames from "classnames";

import {
    deleteMessage,
    // removeMessage,
    setDeleteMessageStatus,
} from "../store/dataSlice";
import {
    Notification,
    toast,
    Avatar,
    Card,
    Dropdown,
    Image,
} from "@/components/ui";
import appConfig from "@/configs/app.config";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsReplyFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { EllipsisButton } from "@/components/shared";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Messages = ({ isOwner, sender, receiver }) => {
    const dispatch = useDispatch();
    const scroll = useRef();
    const { imagePath } = appConfig;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // Select data from the Redux store
    const { messages, deleteMessageStatus } = useSelector(
        (state) => state.chat.data
    );
    const { profile } = useSelector((state) => state.auth.user);
    // const provider = profile?.service ? true : false
    console.log(numPages);
    console.log(pageNumber);

    // const onDocumentLoadSuccess = ({ numPages }) => {
    //     setNumPages(numPages);
    // }

    const onRemoveMessage = (message) => {
        dispatch(deleteMessage({ message_id: message.id }));
    };

    useEffect(() => {
        // Show notification when deleteMessageStatus changes
        const popNotification = () => {
            toast.push(
                <Notification
                    title={`${
                        deleteMessageStatus === "success" ? "Success" : "Error"
                    }`}
                    type={`${
                        deleteMessageStatus === "success" ? "success" : "danger"
                    }`}
                    duration={3000}
                >
                    {deleteMessageStatus === "success"
                        ? "Message deleted successfully!"
                        : "Looks like something went wrong, please try again."}
                </Notification>,
                {
                    placement: "top-center",
                }
            );
        };

        if (deleteMessageStatus !== "idle") {
            popNotification();
        }

        dispatch(setDeleteMessageStatus("idle"));
    }, [deleteMessageStatus, dispatch]);

    useEffect(() => {
        // Scroll to the last message
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <AnimatePresence className="">
            {messages?.map((message) => {
                const owner = isOwner(message);

                return (
                    <motion.div
                        key={message.id}
                        ref={scroll}
                        initial={{ opacity: 0, visibility: "hidden" }}
                        animate={{ opacity: 1, visibility: "visible" }}
                        transition={{ duration: 0.3, type: "tween" }}
                        exit={{ opacity: 0, visibility: "hidden" }}
                        layoutId={message.id}
                        className={classNames(
                            "flex gap-2 items-start",
                            owner ? "justify-end" : "justify-start"
                        )}
                    >
                        {!owner && (
                            <div>
                                <Avatar
                                    src={`${imagePath}/${
                                        receiver?.service?.banner ||
                                        receiver?.image
                                    }`}
                                    size="sm"
                                    shape="circle"
                                />
                            </div>
                        )}
                        <div className="mb-4 max-w-[80%] w-fit">
                            <Card
                                className={classNames(
                                    "max-w-[100%] w-fit",
                                    owner ? "bg-primary-500 text-white" : ""
                                )}
                            >
                                <div className="flex gap-2">
                                    {message.message && (
                                        <p>{message.message}</p>
                                    )}
                                    {message.file && (
                                        <Image
                                            src={`${imagePath}/${message.file}`}
                                            alt=""
                                        />
                                    )}
                                    {/* {message.invoice && (
                                        <div>
                                            <Document file={`${filePath}/${message.invoice}`} onLoadSuccess={onDocumentLoadSuccess}>
                                                <Page pageNumber={pageNumber}  />
                                            </Document>
                                            {numPages > 1 && (
                                                <div className="mt-2 flex items-center gap-4 justify-between">
                                                    <p>
                                                        Page {pageNumber} of {numPages}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="xs"
                                                            variant="solid"
                                                            disabled={pageNumber === 1}
                                                            onClick={() => setPageNumber(pageNumber - 1)}
                                                        >
                                                            Prev
                                                        </Button>
                                                        <Button
                                                            size="xs"
                                                            variant="solid"
                                                            disabled={pageNumber === numPages}
                                                            onClick={() => setPageNumber(pageNumber + 1)}
                                                        >
                                                            Next
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}

                                            {!owner && (
                                                <div className="mt-4">
                                                    <Button
                                                        variant="solid"
                                                        size="xs"
                                                        onClick={() => dispatch(togglePaymentDialog(true))}
                                                    >
                                                        Pay for Service
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )} */}
                                    <Dropdown
                                        placement={
                                            owner ? "top-end" : "top-start"
                                        }
                                        renderTitle={
                                            <EllipsisButton
                                                icon={
                                                    <BiDotsVerticalRounded
                                                        className={
                                                            owner
                                                                ? "text-white"
                                                                : ""
                                                        }
                                                    />
                                                }
                                                variant="twoTone"
                                                shape="round"
                                            />
                                        }
                                    >
                                        <Dropdown.Item
                                            eventKey="Reply"
                                            style={{
                                                justifyContent: "flex-start",
                                            }}
                                        >
                                            <span>
                                                <BsReplyFill className="text-lg" />
                                            </span>
                                            <span>Reply</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            eventKey="Delete"
                                            onClick={() =>
                                                onRemoveMessage(message)
                                            }
                                            style={{
                                                justifyContent: "flex-start",
                                            }}
                                        >
                                            <span>
                                                <MdDelete className="text-lg" />
                                            </span>
                                            <span>Delete</span>
                                        </Dropdown.Item>
                                    </Dropdown>
                                </div>
                            </Card>
                            <div>
                                <p className="text-left">
                                    {dayjs(message.created_at).format("h:mm A")}
                                </p>
                            </div>
                        </div>
                        {owner && (
                            <div>
                                <Avatar
                                    src={`${imagePath}/${
                                        profile?.service?.banner ||
                                        profile?.image
                                    }`}
                                    size="sm"
                                    shape="circle"
                                />
                            </div>
                        )}
                    </motion.div>
                );
            })}

            {/* {chat.invoice && (
                <motion.div
                    ref={scroll}
                    initial={{ opacity: 0, visibility: "hidden" }}
                    animate={{ opacity: 1, visibility: "visible" }}
                    transition={{ duration: 0.3, type: "tween" }}
                    exit={{ opacity: 0, visibility: "hidden" }}
                    layoutId={invoice.id}
                    className={classNames(
                        "flex gap-2 items-start",
                        provider ? "justify-end" : "justify-start"
                    )}
                >
                    {!provider && (
                        <div>
                            <Avatar
                                src={`${imagePath}/${
                                    receiver?.service?.banner ||
                                    receiver?.image
                                }`}
                                size="sm"
                                shape="circle"
                            />
                        </div>
                    )}
                    <div className="mb-4 max-w-[80%] w-fit">
                        <Card
                            className={classNames(
                                "max-w-[100%] w-fit",
                                provider ? "bg-primary-500 text-white" : ""
                            )}
                        >
                            <div className="flex gap-2">
                                <div>
                                    <Document file={`${filePath}/${invoice.file}`} onLoadSuccess={onDocumentLoadSuccess}>
                                        <Page pageNumber={pageNumber}  />
                                    </Document>
                                    {numPages > 1 && (
                                        <div className="mt-2 flex items-center gap-4 justify-between">
                                            <p>
                                                Page {pageNumber} of {numPages}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="xs"
                                                    variant="solid"
                                                    disabled={pageNumber === 1}
                                                    onClick={() => setPageNumber(pageNumber - 1)}
                                                >
                                                    Prev
                                                </Button>
                                                <Button
                                                    size="xs"
                                                    variant="solid"
                                                    disabled={pageNumber === numPages}
                                                    onClick={() => setPageNumber(pageNumber + 1)}
                                                >
                                                    Next
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {!provider && (
                                        <div className="mt-4">
                                            <Button
                                                variant="solid"
                                                size="xs"
                                                onClick={() => dispatch(togglePaymentDialog(true))}
                                            >
                                                Pay for Service
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <Dropdown
                                    placement={
                                        provider ? "top-end" : "top-start"
                                    }
                                    renderTitle={
                                        <EllipsisButton
                                            icon={
                                                <BiDotsVerticalRounded
                                                    className={
                                                        provider
                                                            ? "text-white"
                                                            : ""
                                                    }
                                                />
                                            }
                                            variant="twoTone"
                                            shape="round"
                                        />
                                    }
                                >
                                    <Dropdown.Item
                                        eventKey="Reply"
                                        style={{
                                            justifyContent: "flex-start",
                                        }}
                                    >
                                        <span>
                                            <BsReplyFill className="text-lg" />
                                        </span>
                                        <span>Reply</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="Delete"
                                        onClick={() =>
                                            onRemoveMessage(invoice.id)
                                        }
                                        style={{
                                            justifyContent: "flex-start",
                                        }}
                                    >
                                        <span>
                                            <MdDelete className="text-lg" />
                                        </span>
                                        <span>Delete</span>
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                        </Card>
                        <div>
                            <p className="text-left">
                                {dayjs(invoice.created_at).format("h:mm A")}
                            </p>
                        </div>
                    </div>
                    {provider && (
                        <div>
                            <Avatar
                                src={`${imagePath}/${
                                    profile?.service?.banner ||
                                    profile?.image
                                }`}
                                size="sm"
                                shape="circle"
                            />
                        </div>
                    )}
                </motion.div>
            )} */}
        </AnimatePresence>
    );
};
export default Messages;
