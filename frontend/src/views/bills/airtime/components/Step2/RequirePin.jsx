/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { Button, Dialog, Notification, toast } from "@/components/ui";
import { useState } from "react";
import { useEffect } from "react";
import PinInput from "react-pin-input";
import { BiSolidLockOpen } from "react-icons/bi";
import { togglePinDialog } from "../../store/stateSlice";
import { buyAirtime, setBuyStatus } from "../../store/dataSlice";


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

const RequirePin = () => {
    const dispatch = useDispatch();
    const [pin, setPin] = useState("");

    let pinRef;

    const { formData, pinDialog } = useSelector((state) => state.airtime.state)
    const { buyStatus, buyingAirtime } = useSelector((state) => state.airtime.data)

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
            pinRef?.clear();
            setPin('');
        }

        if (buyStatus === 'error') {
            popNotification(
                "Oops! Something went wrong, please try again.",
                "danger",
                "Error",
                5000
            );

            clearInput();
            dispatch(setBuyStatus('idle'));
            onDialogClose();
        }

        if (buyStatus === 'pin error') {
            popNotification(
                "The PIN entered does not match your transaction PIN, please try again.",
                "danger",
                "Error",
                5000
            );

            clearInput();
            dispatch(setBuyStatus('idle'))
        }

        if (buyStatus === 'success') {
            clearInput();
            dispatch(togglePinDialog(false));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buyStatus])

    const handleSubmit = () => {
        dispatch(buyAirtime({
            pin,
            phone: formData?.phone,
            amount: formData?.amount,
            product: formData?.product,
            operator: formData?.oid,
        }))
    }

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

                {/* <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                > */}
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
                        // type="submit"
                        variant="solid"
                        className="!bg-gray-900 hover:!bg-black mt-6"
                        icon={<BiSolidLockOpen />}
                        loading={buyingAirtime}
                        disabled={!pin || pin?.length < 6}
                        onClick={handleSubmit}
                    >
                        Authorize
                    </Button>
                {/* </form> */}
            </div>
        </Dialog>
    )
}
export default RequirePin