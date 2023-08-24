import { useDispatch, useSelector } from "react-redux"
import { toggleDeleteDialog } from "../../store/stateSlice";
import { Dialog } from "@/components/ui";
import DeleteForm from "./Form";

const DeleteAccount = () => {
    const dispatch = useDispatch();

    const { deleteDialog } = useSelector((state) => state.settings.state)

    const onDialogClose = () => {
        dispatch(toggleDeleteDialog(false));
    }

    return (
        <Dialog
            isOpen={deleteDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            scrollable
            className="overflow-y-auto"
            bodyOpenClassName="overflow-hidden"
            contentClassName="mt-[30vh]"
            title="delete account"
        >
            <h4 className="text-lg font-bold text-gray-700">Are you sure you want to do this?</h4>
            <div className="mt-4 overflow-y-auto">
                <DeleteForm />
            </div>
        </Dialog>
    )
}
export default DeleteAccount