import { Button, Notification, toast } from "@/components/ui";
import { useState } from "react";
import PinInput from "react-pin-input"
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createPin, setStatus } from "../../store/dataSlice";
import { useEffect } from "react";
import { getUser } from "@/store/auth/userSlice";


const INPUT_PIN_STYLE_RESET = {
    padding: undefined,
    margin: undefined,
    textAlign: undefined,
    border: undefined,
    background: undefined,
    width: undefined,
    height: undefined,
}

const FOCUS_INPUT_PIN_STYLE_RESET = {
    outline: undefined,
    boxShadow: undefined,
}

const CreatePin = () => {
    const dispatch = useDispatch();

    const [pin, setPin] = useState('')
    const [confirmPin, setConfirmPin] = useState('')

    const { loading, status } = useSelector((state) => state.pin.data)

    let notMatched = false;
    let matched = false;

    if (confirmPin.length === 6 && confirmPin !== pin) {
        notMatched = true;
    }

    if (confirmPin.length === 6 && confirmPin === pin) {
        matched = true;
    }

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
        if (status === 'error') {
            popNotification(
                "Oops! Something went wrong, please try again.",
                "danger",
                "Error",
                5000
            );

            dispatch(setStatus('idle'))
        }

        if (status === 'success') {
            dispatch(getUser())

            popNotification(
                "Transaction PIN created successfully.",
                "success",
                "Success",
                5000
            );

            dispatch(setStatus('idle'))
        }
    }, [dispatch, status])

    const onCreatePin = () => {
        dispatch(createPin({
            pin: pin,
            pin_confirmation: confirmPin
        }))
    }

    return (
        <div>

            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    onCreatePin();
                }}
            >
                <div className="mb-6">
                    <p className="text-base mb-2">
                        Enter PIN
                    </p>
                    
                    <PinInput 
                        length={6} 
                        initialValue=""
                        // secret
                        secretDelay={200} 
                        onChange={(value) => {
                            setPin(value);
                        }} 
                        type="numeric" 
                        inputMode="number" 
                        inputStyle={INPUT_PIN_STYLE_RESET}
                        inputFocusStyle={FOCUS_INPUT_PIN_STYLE_RESET}
                        // onComplete={(value, index) => {}}
                        autoSelect={true}
                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                    />
                </div>

                <div className="mb-6">
                    <p className="text-base mb-2">
                        Enter PIN Again
                    </p>

                    <PinInput 
                        length={6} 
                        initialValue=""
                        // secret
                        secretDelay={200} 
                        disabled={pin.length < 6}
                        onChange={(value) => {
                            setConfirmPin(value);
                        }} 
                        type="numeric" 
                        inputMode="number" 
                        inputStyle={INPUT_PIN_STYLE_RESET}
                        inputFocusStyle={FOCUS_INPUT_PIN_STYLE_RESET}
                        // onComplete={(value, index) => {}}
                        autoSelect={true}
                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                    />

                    {notMatched && (
                        <motion.p 
                            className="text-red-500 mt-2"
                            key={1} layoutId={1} initial={{ opacity: 0, visibility: "hidden", }}
                            animate={{ opacity: 1, visibility: "visible", }} transition={{ duration: 0.4, type: "tween", }}
                            exit={{ opacity: 0, visibility: "hidden", }}
                        >
                            Your PIN do not match!
                        </motion.p>
                    )}
                </div>

                <Button
                    block
                    type="submit"
                    variant="solid"
                    className="!bg-gray-900 hover:!bg-black mt-2"
                    loading={loading}
                    disabled={!pin || !confirmPin || pin.length < 6 || confirmPin.length < 6 || notMatched || !matched}
                >
                    Create
                </Button>

            </form>
        </div>
    )
}
export default CreatePin