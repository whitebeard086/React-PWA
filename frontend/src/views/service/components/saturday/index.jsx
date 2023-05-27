import { Button } from "components/ui";
import { formatTime } from "components/ui/utils/formatTime";
import { AiOutlineEdit } from "react-icons/ai";
import { BsDashLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setEditingSaturday } from "views/service/store/stateSlice";
import SaturdayDialog from "./SaturdayDialog";

const Saturday = () => {
    const dispatch = useDispatch();
    
    const { saturdayValue, saturdayValue2 } = useSelector((state) => state.service.state);

    return (
        <div className="mt-4">
            <div className="p-3 border-2 rounded-md flex items-center gap-4 justify-between flex-wrap">
                <p className="font-bold ">Saturday</p>

                <div className="flex items-center gap-4">
                    <p className="font-semibold text-gray-500">
                        {formatTime(saturdayValue)}
                    </p>

                    {saturdayValue !== "Not Available" && (
                        <>
                            <BsDashLg className="text-2xl text-gray-500" />

                            <p className="font-semibold text-gray-500">
                                {formatTime(saturdayValue2)}
                            </p>
                        </>
                    )}

                    <Button
                        variant="solid"
                        size="xs"
                        icon={<AiOutlineEdit />}
                        type="button"
                        onClick={() => dispatch(setEditingSaturday(true))}
                    >
                        Edit
                    </Button>
                </div>

                <SaturdayDialog />
            </div>
        </div>
    );
};
export default Saturday;
