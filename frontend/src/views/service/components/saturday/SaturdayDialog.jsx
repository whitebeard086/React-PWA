import { Button, Dialog, Switcher } from "@/components/ui";
import { useEffect, useState } from "react";
import { BsDashLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from "react-time-picker";
import {
    setEditingSaturday,
    setSaturdayValue,
    setSaturdayValue2,
} from "../../store/stateSlice";

const SaturdayDialog = () => {
    const [value, onChange] = useState("08:00");
    const [value2, onChange2] = useState("16:00");
    const dispatch = useDispatch();

    const { saturdayValue } = useSelector((state) => state.service.state);

    useEffect(() => {
        dispatch(setSaturdayValue(value));
    }, [dispatch, value]);

    useEffect(() => {
        dispatch(setSaturdayValue2(value2));
    }, [dispatch, value2]);

    const { editingSaturday } = useSelector((state) => state.service.state);

    const onDialogClose = () => {
        dispatch(setEditingSaturday(false));
    };

    const onSwitcherToggle = (val) => {
        console.log(val);
        if (val) {
            dispatch(setSaturdayValue("Not Available"));
        } else {
            dispatch(setSaturdayValue(value));
        }
    };

    return (
        <Dialog
            isOpen={editingSaturday}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            contentClassName="mt-[30vh]"
        >
            <div className="mt-8">
                <h1 className="font-bold mb-4">Saturday Work Hours</h1>
                <div className="flex justify-between items-center gap-2 flex-wrap">
                    <TimePicker
                        onChange={onChange}
                        value={value}
                        clearIcon={null}
                        clockIcon={null}
                    />

                    <BsDashLg className="text-lg text-gray-500" />

                    <TimePicker
                        onChange={onChange2}
                        value={value2}
                        clearIcon={null}
                        clockIcon={null}
                    />
                </div>

                <div className="mt-8 w-full">
                    <div className="flex  gap-2 items-center justify-between w-full">
                        <p className="font-semibold text-gray-500">
                            Mark day as unavailable
                        </p>
                        <Switcher
                            className=""
                            defaultChecked={saturdayValue === "Not Available"}
                            onChange={onSwitcherToggle}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <Button block variant="solid" onClick={onDialogClose}>
                    Done
                </Button>
            </div>
        </Dialog>
    );
};
export default SaturdayDialog;
