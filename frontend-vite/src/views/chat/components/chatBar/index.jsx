import { Avatar, Button, Dropdown } from "components/ui"
import appConfig from "configs/app.config";
import { AiFillEye, AiOutlineSync } from "react-icons/ai";
import { BsShieldFillCheck } from "react-icons/bs";
import { FaFileInvoiceDollar, FaMoneyCheckAlt } from "react-icons/fa";
import { HiArrowNarrowLeft } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { setViewingInvoice, togglePaymentDialog } from "views/chat/store/stateSlice";

const ChatBar = ({ onCreateInvoice }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { imagePath } = appConfig

    const { provider, invoice, booked } = useSelector((state) => state.chat.data)
    const { viewingInvoice } = useSelector((state) => state.chat.state)
    const { profile } = useSelector((state) => state.auth.user) 

    const isReceiver = profile?.service ? false : true
    const isPaid = invoice?.status === 'paid' ? true : false

    const onViewInvoice = () => {
        if (!viewingInvoice) {
            dispatch(setViewingInvoice(true))
        }

        dispatch(togglePaymentDialog(true))
    }

    const onPayForService = () => {
        if (viewingInvoice) {
            dispatch(setViewingInvoice(false))
        }

        dispatch(togglePaymentDialog(true))
    }

    return (
        <div className="p-4 flex items-center gap-4 justify-between bg-white border-t-2 sticky top-[4.7rem] z-10">
            <div className="flex gap-1 items-center">
                <div onClick={() => navigate(-1)} className="hover:bg-emerald-50 transition duration-300 h-10 w-10 flex items-center justify-center rounded-full cursor-pointer">
                    <HiArrowNarrowLeft className="text-2xl" />
                </div>
                <Link to={`/browse/profile/${provider?.username}`} className="flex gap-2 items-center">
                    <Avatar src={`${imagePath}/${provider?.service?.banner || provider?.image}`} size="md" shape="circle" />
                    <div className="flex flex-col">
                        <h4 className="font-bold text-base">{provider?.service?.title || provider?.username}</h4>
                        <p className="font-semibold text-green-500">Online</p>
                    </div>
                </Link>
            </div>

            {invoice?.status === 'pending' && (
                <Dropdown customToggleClass="flex" placement="bottom-end" renderTitle={<Button size="sm" variant="solid">Invoice {isPaid ? "Paid" : "Available"}</Button>}>
                    <Dropdown.Item onClick={onViewInvoice} eventKey="view" style={{justifyContent: "flex-start"}}>
                        <span><AiFillEye className="text-lg" /></span>
                        <span>View</span>
                    </Dropdown.Item>
                    {(isReceiver && !isPaid) && (
                        <Dropdown.Item onClick={onPayForService} eventKey="pay" style={{justifyContent: "flex-start"}}>
                            <span><FaMoneyCheckAlt className="text-lg" /></span>
                            <span>Pay for Service</span>
                        </Dropdown.Item>
                    )}
                    {!isReceiver && (
                        <Dropdown.Item eventKey="new" onClick={onCreateInvoice} style={{justifyContent: "flex-start"}}>
                            <span><FaFileInvoiceDollar className="text-lg" /></span>
                            <span>New Invoice</span>
                        </Dropdown.Item>
                    )}
                </Dropdown>
            )}

            {(booked && !invoice?.status) && (
                !isReceiver ? (
                    <div className="flex items-center gap-1 p-2 rounded-md bg-primary-500">
                        <BsShieldFillCheck className="text-white text-md" />
                        <p className="text-sm text-white font-semibold">Service Booked</p>
                    </div>
                ) : isReceiver ? (
                    <div className="flex items-center gap-1 p-2 rounded-md bg-primary-500">
                        <AiOutlineSync className="text-white text-md" />
                        <p className="text-sm text-white font-semibold">Service Ongoing</p>
                    </div>
                ) : null
            )}
        </div>
    )
}
export default ChatBar