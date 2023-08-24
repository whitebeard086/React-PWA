/* eslint-disable react/prop-types */
import { Button, Notification, toast } from "@/components/ui"
import { AiOutlineRollback } from "react-icons/ai"
import { BsBagCheckFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { setBuyStatus } from "../../store/dataSlice"
import { useEffect } from "react"
import { togglePinDialog } from "../../store/stateSlice"
import RequirePin from "./RequirePin"
import { useNavigate } from "react-router-dom"
import { getUser } from "@/store/auth/userSlice"

const Step2 = ({ onBack }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { formData } = useSelector((state) => state.airtime.state)
    const { buyStatus, buyingAirtime } = useSelector((state) => state.airtime.data)
    const { hasPin } = useSelector((state) => state.auth.user)

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
        if (buyStatus === 'error') {
            popNotification(
                "Oops! Something went wrong, please try again.",
                "danger",
                "Error",
                5000
            );

            dispatch(setBuyStatus('idle'));
            onBack();
        }

        if (buyStatus === 'success') {
            popNotification(
                "Transaction completed successfully.",
                "success",
                "Success",
                5000
            );

            dispatch(setBuyStatus('idle'));
            dispatch(getUser());
            onBack();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buyStatus])

    const onConfirm = () => {
        if (!hasPin) {
            navigate('/transaction-pin');
        } else {
            dispatch(togglePinDialog(true));
        }
    } 

    

    return (
        <div>
            <div>
                <h4 className="text-base mb-2">
                    Your Order
                </h4>

                <div className="flex items-center gap-2 justify-between">   
                    <p className="text-sm">
                        Operator:
                    </p>
                    <p className="text-sm font-semibold">
                        {formData?.operator}
                    </p>
                </div>

                <div className="flex items-center gap-2 justify-between">   
                    <p className="text-sm">
                        Phone Number:
                    </p>
                    <p className="text-sm font-semibold">
                        {formData?.phone}
                    </p>
                </div>

                <div className="flex items-center gap-2 justify-between">   
                    <p className="text-sm">
                        Recharge Amount:
                    </p>
                    <p className="text-sm font-semibold">
                        {`₦${formData?.amount?.toLocaleString()}`}
                    </p>
                </div>
                
                <div className="flex items-center gap-4 mt-8">
                    <Button
                        block
                        variant="solid"
                        color="red-500"
                        icon={<AiOutlineRollback />}
                        className=""
                        disabled={buyingAirtime}
                        onClick={() => onBack()}
                    >
                        Back
                    </Button>
                    <Button
                        block
                        variant="solid"
                        icon={<BsBagCheckFill />}
                        className="!bg-gray-900 hover:!bg-black"
                        loading={buyingAirtime}
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
            <RequirePin />
        </div>
    )
}
export default Step2