import { Dialog, Notification, toast } from "@/components/ui"
import { useDispatch, useSelector } from "react-redux"
import { toggleAccountDialog } from "../../store/stateSlice";
import NewAccountForm from "./Form";

const NewAccountDialog = () => {
    const dispatch = useDispatch();

    const { accountDialog } = useSelector((state) => state.withdraw.state)

    const onDialogClose = () => {
        dispatch(toggleAccountDialog(false));
    }

    const popNotification = (message, type, title, duration) => {
        toast.push(
            <Notification
                title={title || `${"Error"}`}
                type={type || `${"warning"}`}
                duration={duration || 3000}
            >
                {message}
            </Notification>,
            {
                placement: "top-center",
            }
        );
    };

    return (
        <Dialog
            isOpen={accountDialog}
            onClose={onDialogClose}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            scrollable
            className="overflow-y-auto"
            bodyOpenClassName="overflow-hidden"
            contentClassName="mt-[20vh]"
            title="Add New Account"
        >
            <h4 className="text-lg font-bold text-gray-700">
                Add a New Bank Account
            </h4>

            <div className="mt-4 min-h-[40vh]">
                <NewAccountForm />
            </div>
        </Dialog>
    )
}
export default NewAccountDialog