import { EllipsisButton } from "components/shared"
import { Dropdown, Notification, Upload, toast } from "components/ui"
import { useDropdownMenuContext } from "components/ui/Dropdown/context/dropdownMenuContext"
import appConfig from "configs/app.config"
import { useState } from "react"
import { BsEmojiSmile } from "react-icons/bs"
import { FaFileImage, FaFileInvoiceDollar } from "react-icons/fa"
import { IoIosAddCircleOutline, IoIosSend } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useCompressFile from "utils/hooks/useCompressFile"
import TextareaAutosize from 'react-textarea-autosize';
import { setFile, setInvoice, setMessage } from "../store/stateSlice"
import { useEffect } from "react"
import { sendMessage } from "../store/dataSlice"
import useFocus from "./useFocus"

const MessageBox = () => {
    const dispatch = useDispatch();
    const { compressFile, compressedFile, compressedFileError, resetCompressedFile } = useCompressFile();
    const [avatarImg, setAvatarImg] = useState(null)
    const [message, setMessage] = useState("")
    const [inputRef, setInputFocus] = useFocus()
    const menuControl = useDropdownMenuContext()

    const {file, invoice } = useSelector((state) => state.chat.state)
    const { chat } = useSelector((state) => state.chat.data)
    const { userType, profile } = useSelector((state) => state.auth.user)

    const onFileUpload = (file) => {
        setAvatarImg(URL.createObjectURL(file[0]))
        compressFile(file[0], 0.15)
    }

    const handleChange = (e) => {
        setMessage(e.target?.value)
    };

    // Handle Message Sending
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
            setInputFocus()
            return
        }

        dispatch(sendMessage({
            chat_id: chat?.id,
            sender_id: profile?.id,
            file: compressedFile,
            message: message,
            invoice: invoice
        }))

        dispatch(setFile({}))
        setMessage("")
        dispatch(setInvoice({}))
        resetCompressedFile()
    }

    useEffect(() => {
        if (compressedFile !== null) {
            dispatch(setFile(compressedFile))
            if (file !== {}) {
                dispatch(sendMessage({
                    chat_id: chat?.id,
                    sender_id: profile?.id,
                    file: compressedFile
                }))
            }

            dispatch(setFile({}))
            resetCompressedFile()
        }
        menuControl.closeMenu()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [compressedFile, dispatch])

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
                <BsEmojiSmile className="text-2xl" />
            </div>
            <div className="hover:bg-emerald-50 hover:shadow-md cursor-pointer transition duration-300 w-8 h-8 flex items-center justify-center rounded-full">
                <Dropdown customToggleClass="flex" placement="top-end" renderTitle={<EllipsisButton icon={<IoIosAddCircleOutline className="text-3xl text-gray-600" />} variant="twoTone" shape="round" />}>
                    <Dropdown.Item style={{justifyContent: "flex-start"}}>
                        <Upload 
                            className="flex items-center gap-2 w-full h-full"
                            onChange={onFileUpload}
                            showList={false}
                            uploadLimit={1}
                            accept='image/*'
                        >
                            <span><FaFileImage className="text-lg" /></span>
                            <span>File</span>
                        </Upload>
                    </Dropdown.Item>
                    {userType === "Provider" && (
                        <Dropdown.Item eventKey="Invoice" style={{justifyContent: "flex-start"}}>
                            <span><FaFileInvoiceDollar className="text-lg" /></span>
                            <span>Invoice</span>
                        </Dropdown.Item>
                    )}
                </Dropdown>
            </div>
            <div className="w-fit">
                <div onClick={onSendMessage} className="bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md cursor-pointer transition duration-300 w-12 h-12 flex items-center justify-center rounded-full">
                    <IoIosSend className="text-3xl" />
                </div>
            </div>
        </div>
    )
}
export default MessageBox