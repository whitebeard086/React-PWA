import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput";
import { useEffect, useState } from "react";
import { Alert, Button, Notification, toast } from "components/ui";
import Countdown from "react-countdown";
import { resetStatus, setTimer, updatePhone, verifyPhone } from "../store/dataSlice";
import useTimeOutMessage from "utils/hooks/useTimeOutMessage";
import { getUser } from "store/auth/userSlice";
import { Loading } from "components/shared";
import { setResent } from "../store/stateSlice";

const Step2 = ({ onBack }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [otp, setOtp] = useState("")
    const [message, setMessage] = useTimeOutMessage();

    const { profile } = useSelector((state) => state.auth.user)
    const { resent } = useSelector((state) => state.verify.state)
    const { status, verifyMessage, verifying, resending, timer } = useSelector((state) => state.verify.data)

    useEffect(() => {
        const popNotification = (keyword) => {
            toast.push(
                <Notification
                    title={`${status === "success" ? "Success" : "Error"}`}
                    type={`${status === "success" ? "success" : "danger"}`}
                    duration={2000}
                >
                    {status === "success" ? "Phone number verified successfully!" : "Looks like something went wrong, please try again."}
                </Notification>,
                {
                    placement: "top-center",
                }
            );
        };
            
        if (status === 'success' || status === 'error') {
            setMessage(verifyMessage)
            setOtp("")
            popNotification()
            dispatch(getUser())

            setTimeout(() => {
                dispatch(resetStatus())

                if (status === 'success') {
                    navigate('/home')
                }
            }, 1200)
        }
    }, [dispatch, navigate, setMessage, status, verifyMessage])

    const onResendOtp = () => {
        dispatch(setTimer(true))
        dispatch(setResent(true))
        dispatch(updatePhone({ phone: profile?.phone }))
    }

    const onVerify = () => {
        dispatch(setTimer(false))
        dispatch(verifyPhone({ phone: profile?.phone, otp }))
    }

    const onWrongPhone = () => {
        dispatch(setTimer(true))
        onBack()
    }

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <span onClick={() => onResendOtp()} className="font-bold text-gray-700 underline cursor-pointer">
                    Resend OTP
                </span>
            )
        } else {
            return (
                <span className="font-bold text-gray-700">
                    Wait {minutes}:{seconds} mins
                </span>
            );
        }
    };
 
    return (
        <div className="h-full flex flex-col justify-center">
            <div className="w-full flex flex-col gap-4 justify-center">
                <div className="w-full flex justify-center items-center">
                    <img className="w-72" src="/img/signup.png" alt="" />
                </div>

                <div>
                    <h1 className="text-center mt-4 text-2xl font-bold">Verify Phone Number</h1>
                    {resent ? (
                        <p className="font-semibold text-center text-gray-400">We have sent a new OTP to {profile?.phone?.replace(/(\d{3})(\d{4})(\d{3})(\d{4})/, "$1 $2 $3 $4")}</p>
                    ):(
                        <p className="font-semibold text-center text-gray-400">Enter the OTP code sent to {profile?.phone?.replace(/(\d{3})(\d{4})(\d{3})(\d{4})/, "$1 $2 $3 $4")}</p>
                    )}
                </div>

                <div className="mt-4">
                    {message && (
                        <Alert className="mb-4" type={status === "error" ? "danger" : "success"} showIcon>
                            {message}
                        </Alert>
                    )}
                    <form 
                        onSubmit={async (e) => {
                            e.preventDefault();
                            onVerify();
                        }}
                    >
                        <div className="grid place-content-center bg-base-100">
                            <OtpInput 
                                inputSize="lg"
                                size={4}
                                value={otp}
                                onChange={(val) => {
                                    setOtp(val);
                                }}
                            />

                            <Button
                                className="mt-8"
                                block
                                variant="solid"
                                type="submit"
                                disabled={otp?.length < 4}
                                loading={verifying}
                            >
                                Verify & Proceed
                            </Button>

                            <div className="mt-4">
                                <p className="text-gray-400 text-center font-semibold flex w-full justify-center gap-2">
                                    Didn't receive the OTP? {" "}
                                    {(resending) ? (
                                        <span className="inline">
                                            <Loading size={22} loading={true} />
                                        </span>
                                    ) : (
                                        <Countdown 
                                            date={timer ? Date.now() + 90000 : Date.now()} 
                                            renderer={renderer} 
                                        />
                                    )}
                                </p>
                                <p onClick={() => onWrongPhone()} className="font-bold text-gray-700 text-center underline cursor-pointer mt-2">
                                    Wrong phone number?
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Step2