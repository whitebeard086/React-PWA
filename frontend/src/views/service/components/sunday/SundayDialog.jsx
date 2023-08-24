import { Button, Dialog, Switcher } from "@/components/ui";
import { useEffect, useState } from "react";
import { BsDashLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import TimePicker from "react-time-picker";
import {
    setEditingSunday,
    setSundayValue,
    setSundayValue2,
} from "../../store/stateSlice";

const SundayDialog = () => {
    const [value, onChange] = useState("08:00");
    const [value2, onChange2] = useState("16:00");
    const dispatch = useDispatch();

    const { sundayValue } = useSelector((state) => state.service.state);

    useEffect(() => {
        dispatch(setSundayValue(value));
    }, [dispatch, value]);

    useEffect(() => {
        dispatch(setSundayValue2(value2));
    }, [dispatch, value2]);

    const { editingSunday } = useSelector((state) => state.service.state);

    const onDialogClose = () => {
        dispatch(setEditingSunday(false));
    };

    const onSwitcherToggle = (val) => {
        console.log(val);
        if (val) {
            dispatch(setSundayValue("Not Available"));
        } else {
            dispatch(setSundayValue(value));
        }
    };

    return (
        <Dialog
            isOpen={editingSunday}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            contentClassName="mt-[30vh]"
        >
            <div className="mt-8">
                <h1 className="font-bold mb-4">Sunday Work Hours</h1>
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
                            defaultChecked={sundayValue === "Not Available"}
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
export default SundayDialog;
