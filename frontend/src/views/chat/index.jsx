import { injectReducer } from "store";
import reducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { initiateChat, sendMessage } from "./store/dataSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
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

injectReducer("chat", reducer);

const Chat = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { imagePath } = appConfig;
    const { providerSlug } = useParams();
    const { compressFile, compressedFile, compressedFileError, resetCompressedFile } = useCompressFile();
    

    const { message, file, invoice } = useSelector((state) => state.chat.state)
    const { chat } = useSelector((state) => state.chat.data)
    const { userType, profile } = useSelector((state) => state.auth.user)

    // console.log(compressedFileError);
    // console.log(compressedFile);
    

    const { gettingProvider, provider } = useSelector((state) => state.chat.data);

    useEffect(() => {
        dispatch(initiateChat({ slug: providerSlug }));
    }, [dispatch, providerSlug]);

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
                                <Avatar src={`${imagePath}/${provider?.image}`} size="lg" shape="circle" />
                                <div className="flex flex-col">
                                    <h4 className="font-bold text-base">{provider?.username}</h4>
                                    <p className="font-semibold text-green-500">Online</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="p-4">
                        {/* <div className="mt-4 mb-4 max-w-[80%] w-fit flex gap-2">
                            <div>
                                <Avatar src={`${imagePath}/${provider?.image}`} size="sm" shape="circle" />
                            </div>
                            <div className="flex flex-col">
                                <Card className="max-w-[100%] w-fit">
                                    <div className="flex gap-2">
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam consectetur vel in ipsam quo atque doloremque tempora impedit dignissimos, quisquam quae illum labore dolorem eum sunt ea assumenda, iste optio.
                                        </p>
                                        <Dropdown placement="bottom-end" renderTitle={<EllipsisButton icon={<BiDotsVerticalRounded />} variant="twoTone" shape="round" />}>
                                            <Dropdown.Item eventKey="Reply" style={{justifyContent: "flex-start"}}>
                                                <span><BsReplyFill className="text-lg" /></span>
                                                <span>Reply</span>
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                </Card>
                                <div>
                                    <p className="text-right">8:02 PM</p>
                                </div>
                            </div>
                        </div> */}

                        <div className="flex flex-row-reverse justify-end gap-2 items-start">
                            <div className="mb-4 max-w-[80%] w-fit">
                                <Card className="max-w-[100%] w-fit">
                                    <div className="flex gap-2">
                                        <p>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                        </p>
                                        <Dropdown placement="bottom-end" renderTitle={<EllipsisButton icon={<BiDotsVerticalRounded className="text-white" />} variant="twoTone" shape="round" />}>
                                            <Dropdown.Item eventKey="Reply" style={{justifyContent: "flex-start"}}>
                                                <span><BsReplyFill className="text-lg" /></span>
                                                <span>Reply</span>
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                </Card>
                                <div>
                                    <p className="text-right">8:02 PM</p>
                                </div>
                            </div>
                            <div>
                                <Avatar src={`${imagePath}/${provider?.image}`} size="sm" shape="circle" />
                            </div>
                        </div>
                        
                        <div className="mb-14">
                            <Messages />
                        </div>
                    </div>

                    <div className="fixed w-full p-4 pb-5 bg-white max-w-2xl left-auto right-auto bottom-[5.2rem] border-b-2">
                        <MessageBox />
                    </div>
                </div>
            )}
        </div>
    );
};
export default Chat;
