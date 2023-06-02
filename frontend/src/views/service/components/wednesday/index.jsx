import { Button } from "components/ui";
import { formatTime } from "components/ui/utils/formatTime";
import { AiOutlineEdit } from "react-icons/ai";
import { BsDashLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setEditingWednesday } from "views/service/store/stateSlice";
import WednesdayDialog from "./WednesdayDialog";

const Wednesday = () => {
    const dispatch = useDispatch();
    
    const { wednesdayValue, wednesdayValue2 } = useSelector((state) => state.service.state);

    return (
        <div className="mt-4 bg-white">
            <div className="p-3 border-2 rounded-md flex items-center gap-4 justify-between flex-wrap">
                <p className="font-bold ">Wednesday</p>

                <div className="flex items-center gap-4">
                    <p className="font-semibold text-gray-500">
                        {formatTime(wednesdayValue)}
                    </p>

                    {wednesdayValue !== "Not Available" && (
                        <>
                            <BsDashLg className="text-2xl text-gray-500" />

                            <p className="font-semibold text-gray-500">
                                {formatTime(wednesdayValue2)}
                            </p>
                        </>
                    )}

                    <Button
                        variant="solid"
                        size="xs"
                        icon={<AiOutlineEdit />}
                        type="button"
                        onClick={() => dispatch(setEditingWednesday(true))}
                    >
                        Edit
                    </Button>
                </div>

                <WednesdayDialog />
            </div>
        </div>
    );
};
export default Wednesday;
