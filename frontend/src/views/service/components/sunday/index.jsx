import { Button } from "components/ui";
import { formatTime } from "components/ui/utils/formatTime";
import { AiOutlineEdit } from "react-icons/ai";
import { BsDashLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setEditingSunday } from "views/service/store/stateSlice";
import SundayDialog from "./SundayDialog";

const Sunday = () => {
    const dispatch = useDispatch();
    
    const { sundayValue, sundayValue2 } = useSelector((state) => state.service.state);

    return (
        <div className="mt-4">
            <div className="p-3 border-2 rounded-md flex items-center gap-4 justify-between flex-wrap">
                <p className="font-bold ">Sunday</p>

                <div className="flex items-center gap-4">
                    <p className="font-semibold text-gray-500">
                        {formatTime(sundayValue)}
                    </p>

                    {sundayValue !== "Not Available" && (
                        <>
                            <BsDashLg className="text-2xl text-gray-500" />

                            <p className="font-semibold text-gray-500">
                                {formatTime(sundayValue2)}
                            </p>
                        </>
                    )}

                    <Button
                        variant="solid"
                        size="xs"
                        icon={<AiOutlineEdit />}
                        type="button"
                        onClick={() => dispatch(setEditingSunday(true))}
                    >
                        Edit
                    </Button>
                </div>

                <SundayDialog />
            </div>
        </div>
    );
};
export default Sunday;
