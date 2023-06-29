import { injectReducer } from "store";
import reducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { initiateChat, sendMessage } from "./store/dataSlice";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { EllipsisButton, Loading } from "components/shared";
import { Avatar, Card, Dropdown, Upload } from "components/ui";
import { HiArrowNarrowLeft } from "react-icons/hi";
import appConfig from "configs/app.config";
import useAutosizeTextArea from "./useAutosizeTextArea";
import TextareaAutosize from 'react-textarea-autosize';
import { BsEmojiSmile, BsReplyFill } from "react-icons/bs";
import { IoIosAddCircleOutline, IoIosSend } from "react-icons/io";
import dayjs from "dayjs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { setFile, setInvoiceNumber, setMessage, toggleInvoiceDialog } from "./store/stateSlice";
import { FaFileImage, FaFileInvoiceDollar } from "react-icons/fa";
import useCompressFile from "utils/hooks/useCompressFile";
import { useDropdownMenuContext } from "components/ui/Dropdown/context/dropdownMenuContext";
import Messages from "./components/Messages";
import MessageBox from "./components/MessageBox";
import { io } from "socket.io-client"
import InvoiceDialog from "./components/invoice/InvoiceDialog";
import PaymentDialog from "./components/PaymentDialog";
import ChatBar from "./components/chatBar";
import createUID from "components/ui/utils/createUid";

injectReducer("chat", reducer);

const Chat = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { imagePath } = appConfig;
    const { providerSlug } = useParams();
    const socket = useRef();
    const { compressFile, compressedFile, compressedFileError, resetCompressedFile } = useCompressFile();
    console.log(state);

    const { message, file, invoice } = useSelector((state) => state.chat.state)
    const { chat } = useSelector((state) => state.chat.data)
    const { userType, profile } = useSelector((state) => state.auth.user)

    // Determine the sender and receiver based on the logged-in user
    const sender = profile?.id === chat?.user?.id ? chat?.user : chat?.receiver;
    const receiver =
        profile?.id === chat?.user?.id ? chat?.receiver : chat?.user;

    const isOwner = (message) => message?.sender_id === profile?.id;

    const { gettingProvider, provider } = useSelector((state) => state.chat.data);

    const onCreateInvoice = () => {
        dispatch(toggleInvoiceDialog(true))
        dispatch(setInvoiceNumber(createUID(8)))
    }

    useEffect(() => {
        socket.current = io("http://localhost:8800")
        socket.current.emit("addNewUser", profile?.id)
    }, [profile])

    useEffect(() => {
        dispatch(initiateChat({ slug: providerSlug, id: state?.chat && state.chat, provider_id: state?.provider_id && state.provider_id }));
    }, [dispatch, providerSlug, state]);

    return (
        <div className="">
            {gettingProvider ? (
                <div className="min-h-[70vh] flex justify-center items-center">
                    <Loading loading={true} />
                </div>
            ) : (
                <div className="relative min-h-[72vh]">
                    {/* <hr /> */}
                    <ChatBar 
                        onCreateInvoice={onCreateInvoice}
                    />

                    <div className="p-4">
                        
                        
                        <div className="mb-14">
                            <Messages 
                                isOwner={isOwner}
                                sender={sender}
                                receiver={receiver}
                            />
                        </div>
                    </div>

                    <div className="sticky w-full min-w-full p-4 pb-5 bg-white max-w-2xl bottom-[5.2rem] border-b-2">
                        <MessageBox 
                            receiver={receiver}
                            socket={socket.current}
                            onCreateInvoice={onCreateInvoice}
                        />
                    </div>
                </div>
            )}

            <InvoiceDialog 
                receiver={receiver}
            />
            <PaymentDialog />
        </div>
    );
};
export default Chat;
