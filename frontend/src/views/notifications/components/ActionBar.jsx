import { Button, Card } from "@/components/ui"
import { BsEnvelopeX } from "react-icons/bs"
import { HiOutlineMailOpen } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { readAllNotifications } from "../store/dataSlice"
import { toggleClearMessages } from "../store/stateSlice"

const ActionBar = () => {
    const dispatch = useDispatch();

    const onReadAll = () => {
        dispatch(readAllNotifications());
    }

    const onClearAll = () => {
        dispatch(toggleClearMessages(true))
    }

    return (
        <Card className="mb-4">
            <div className="flex items-center gap-4">
                <Button
                    variant="solid"
                    className="!bg-gray-900 hover:!bg-black"
                    size="xs"
                    icon={<HiOutlineMailOpen />}
                    onClick={onReadAll}
                >
                    Mark all as read
                </Button>
                <Button
                    variant="solid"
                    className="!bg-gray-900 hover:!bg-black"
                    size="xs"
                    icon={<BsEnvelopeX />}
                    onClick={onClearAll}
                >
                    Clear all
                </Button>
            </div>
        </Card>
    )
}
export default ActionBar