import { Button } from "components/ui";
import { formatTime } from "components/ui/utils/formatTime";
import { AiOutlineEdit } from "react-icons/ai";
import { BsDashLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setEditingMonday } from "views/service/store/stateSlice";
import MondayDialog from "./MondayDialog";

const Monday = () => {
    const dispatch = useDispatch();
    
    const { mondayValue, mondayValue2 } = useSelector((state) => state.service.state);

    return (
        <div className="mt-4">
            <div className="p-3 border-2 rounded-md flex items-center gap-4 justify-between flex-wrap">
                <p className="font-bold ">Monday</p>

                <div className="flex items-center gap-4">
                    <p className="font-semibold text-gray-500">
                        {formatTime(mondayValue)}
                    </p>

                    {mondayValue !== "Not Available" && (
                        <>
                            <BsDashLg className="text-2xl text-gray-500" />

                            <p className="font-semibold text-gray-500">
                                {formatTime(mondayValue2)}
                            </p>
                        </>
                    )}

                    <Button
                        variant="solid"
                        size="xs"
                        icon={<AiOutlineEdit />}
                        type="button"
                        onClick={() => dispatch(setEditingMonday(true))}
                    >
                        Edit
                    </Button>
                </div>

                <MondayDialog />
            </div>
        </div>
    );
};
export default Monday;
