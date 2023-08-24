import { Button } from "@/components/ui";
import { formatTime } from "@/components/ui/utils/formatTime";
import { AiOutlineEdit } from "react-icons/ai";
import { BsDashLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setEditingFriday } from "../../store/stateSlice";
import FridayDialog from "./FridayDialog";

const Friday = () => {
    const dispatch = useDispatch();

    const { fridayValue, fridayValue2 } = useSelector(
        (state) => state.service.state
    );

    return (
        <div className="mt-4 bg-white">
            <div className="p-3 border-2 rounded-md flex items-center gap-4 justify-between flex-wrap">
                <p className="font-bold ">Friday</p>

                <div className="flex items-center gap-4">
                    <p className="font-semibold text-gray-500">
                        {formatTime(fridayValue)}
                    </p>

                    {fridayValue !== "Not Available" && (
                        <>
                            <BsDashLg className="text-2xl text-gray-500" />

                            <p className="font-semibold text-gray-500">
                                {formatTime(fridayValue2)}
                            </p>
                        </>
                    )}

                    <Button
                        variant="solid"
                        size="xs"
                        icon={<AiOutlineEdit />}
                        type="button"
                        onClick={() => dispatch(setEditingFriday(true))}
                    >
                        Edit
                    </Button>
                </div>

                <FridayDialog />
            </div>
        </div>
    );
};
export default Friday;
