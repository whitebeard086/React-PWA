import { useDispatch, useSelector } from "react-redux";
import { toggleCancelDeleteDialog } from "../../store/stateSlice";
import { Dialog } from "@/components/ui";
import CancelForm from "./CancelForm";

const CancelDialog = () => {
    const dispatch = useDispatch();

    const { cancelDeleteDialog } = useSelector((state) => state.settings.state)

    const onDialogClose = () => {
        dispatch(toggleCancelDeleteDialog(false));
    }

    return (
        <Dialog
            isOpen={cancelDeleteDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            scrollable
            className="overflow-y-auto"
            bodyOpenClassName="overflow-hidden"
            contentClassName="mt-[30vh]"
            title="delete account"
        >
            <h4 className="text-lg font-bold text-gray-700">Are you sure you want to cancel this action?</h4>
            <div className="mt-4 overflow-y-auto">
                <CancelForm />
            </div>
        </Dialog>
    )
}
export default CancelDialog