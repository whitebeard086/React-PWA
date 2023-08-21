/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { togglePinDialog } from "../store/stateSlice";
import { Button, Dialog, Notification, toast } from "@/components/ui";
import { useState } from "react";
import { useEffect } from "react";
import PinInput from "react-pin-input";
import { BiSolidLockOpen } from "react-icons/bi";


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

const RequirePin = ({ status, setStatus, setPinData, handleSubmit, loading }) => {
    const dispatch = useDispatch();
    const [pin, setPin] = useState("");

    let pinRef;

    const { pinDialog } = useSelector((state) => state.payments.state)

    const onDialogClose = () => {
        dispatch(togglePinDialog(false));
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
            pinRef.clear();
            dispatch(setPin(''));
        }

        if (status === 'error') {
            popNotification(
                "Oops! Something went wrong, please try again.",
                "danger",
                "Error",
                5000
            );

            clearInput();
            dispatch(setStatus('idle'));
            onDialogClose();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    return (
        <Dialog
            isOpen={pinDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            contentClassName="mt-[30vh]"
            title="Require PIN"
        >
            <h4 className="text-lg font-bold text-gray-700">Authorize Transaction</h4>
            <div className="mt-4">
                <p className="text-sm mb-2">Please enter your transaction pin to authorize this transaction</p>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        dispatch(setPinData(pin))
                        handleSubmit();
                    }}
                >
                    <div>
                        <PinInput 
                            length={6} 
                            initialValue=""
                            secretDelay={200} 
                            ref={(n) => pinRef=n}
                            onChange={(value) => {
                                setPin(value);
                            }} 
                            type="numeric" 
                            inputMode="number" 
                            inputStyle={INPUT_PIN_STYLE_RESET}
                            inputFocusStyle={FOCUS_INPUT_PIN_STYLE_RESET}
                            autoSelect={true}
                            // onComplete={(value) => {
                            //     dispatch(setPinData(value));
                            // }}
                            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                        />
                    </div>

                    <Button
                        block
                        type="submit"
                        variant="solid"
                        className="!bg-gray-900 hover:!bg-black mt-6"
                        icon={<BiSolidLockOpen />}
                        loading={loading}
                        disabled={!pin || pin?.length < 6}
                    >
                        Authorize
                    </Button>
                </form>
            </div>
        </Dialog>
    )
}
export default RequirePin