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
import { setFile, setMessage } from "./store/stateSlice";
import { FaFileImage, FaFileInvoiceDollar } from "react-icons/fa";
import useCompressFile from "utils/hooks/useCompressFile";
import { useDropdownMenuContext } from "components/ui/Dropdown/context/dropdownMenuContext";
import Messages from "./components/Messages";
import MessageBox from "./components/MessageBox";
import { io } from "socket.io-client"
import InvoiceDialog from "./components/invoice/InvoiceDialog";

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
                    <div className="p-4 bg-white border-t-2 sticky top-[4.7rem] z-10">
                        <div className="flex gap-2 items-center">
                            <div onClick={() => navigate(-1)} className="hover:bg-emerald-50 transition duration-300 h-10 w-10 flex items-center justify-center rounded-full cursor-pointer">
                                <HiArrowNarrowLeft className="text-2xl" />
                            </div>
                            <Link to={`/browse/profile/${provider?.username}`} className="flex gap-2 items-center">
                                <Avatar src={`${imagePath}/${provider?.service?.banner || provider?.image}`} size="lg" shape="circle" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-base">{provider?.service?.title || provider?.username}</h4>
                                    <p className="font-semibold text-green-500">Online</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="p-4">
                        
                        
                        <div className="mb-14">
                            <Messages 
                                isOwner={isOwner}
                                sender={sender}
                                receiver={receiver}
                            />
                        </div>
                    </div>

                    <div className="fixed w-full p-4 pb-5 bg-white max-w-2xl left-auto right-auto bottom-[5.2rem] border-b-2">
                        <MessageBox 
                            receiver={receiver}
                            socket={socket.current}
                        />
                    </div>
                </div>
            )}

            <InvoiceDialog 
                receiver={receiver}
            />
        </div>
    );
};
export default Chat;
