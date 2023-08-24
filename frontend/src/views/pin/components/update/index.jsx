import { Button, Notification, toast } from "@/components/ui";
import { useState } from "react";
import PinInput from "react-pin-input"
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, updatePin } from "../../store/dataSlice";
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

const UpdatePin = () => {
    const dispatch = useDispatch();

    const [pin, setPin] = useState('')
    const [newPin, setNewPin] = useState('')
    const [confirmPin, setConfirmPin] = useState('')

    const { loading, status } = useSelector((state) => state.pin.data)

    let notMatched = false;
    let matched = false;
    let pinRef;
    let newRef;
    let confirmRef;

    if (confirmPin.length === 6 && confirmPin !== newPin) {
        notMatched = true;
    }

    if (confirmPin.length === 6 && confirmPin === newPin) {
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
        const clearInput = () => {
            confirmRef.clear();
            newRef.clear();
            pinRef.clear();
            setPin('');
            setNewPin('');
            setConfirmPin('');
        }

        if (status === 'error') {
            popNotification(
                "Oops! Something went wrong, please try again.",
                "danger",
                "Error",
                5000
            );

            clearInput();
            dispatch(setStatus('idle'))
        }

        if (status === 'pin error') {
            popNotification(
                "The PIN entered does not match your transaction PIN, please try again.",
                "danger",
                "Error",
                5000
            );

            clearInput();
            dispatch(setStatus('idle'))
        }

        if (status === 'duplicate error') {
            popNotification(
                "The PIN entered is the same as your transaction PIN, please enter a new PIN.",
                "danger",
                "Error",
                5000
            );

            clearInput();
            dispatch(setStatus('idle'))
        }

        if (status === 'success') {
            dispatch(getUser())

            popNotification(
                "Transaction PIN updated successfully.",
                "success",
                "Success",
                5000
            );

            clearInput();
            dispatch(setStatus('idle'))
        }
    }, [confirmRef, dispatch, newRef, pinRef, status])

    const onUpdatePin = () => {
        dispatch(updatePin({
            old_pin: pin,
            pin: newPin,
            pin_confirmation: confirmPin
        }))
    }

    return (
        <div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    onUpdatePin();
                }}            
            >
                <div className="mb-6">
                    <p className="text-base mb-2">
                        Enter Old PIN
                    </p>

                    <PinInput 
                        length={6} 
                        initialValue=""
                        // secret
                        secretDelay={200} 
                        ref={(n) => pinRef=n}
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
                        Enter New PIN
                    </p>

                    <PinInput 
                        length={6} 
                        initialValue=""
                        // secret
                        secretDelay={200} 
                        ref={(n) => newRef=n}
                        disabled={pin.length < 6}
                        onChange={(value) => {
                            setNewPin(value);
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
                        Enter New PIN Again
                    </p>

                    <PinInput 
                        length={6} 
                        initialValue=""
                        // secret
                        secretDelay={200} 
                        ref={(n) => confirmRef=n}
                        disabled={newPin.length < 6}
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
                    disabled={!pin || !newPin || !confirmPin || pin.length < 6 || newPin.length < 6 || confirmPin.length < 6 || notMatched || !matched}
                >
                    Update
                </Button>
            </form>
        </div>
    )
}
export default UpdatePin