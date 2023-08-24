import { useDispatch, useSelector } from "react-redux"
import { setSelectedAccount, toggleDeleteDialog } from "../../store/stateSlice";
import { ConfirmDialog } from "@/components/shared";
import { getWithdrawalData, removeAccount, setDeleteStatus } from "../../store/dataSlice";
import { useEffect } from "react";
import { Notification, toast } from "@/components/ui";
import { getUser } from "@/store/auth/userSlice";

const RemoveAccount = () => {
    const dispatch = useDispatch();

    const { deleteStatus, deleting } = useSelector((state) => state.withdraw.data)
    const { deleteDialog, selectedAccount } = useSelector((state) => state.withdraw.state)

    const onClose = () => {
        dispatch(setSelectedAccount(null));
        dispatch(toggleDeleteDialog(false));
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

    useEffect(() => {
        if (deleteStatus === 'error') {
            dispatch(toggleDeleteDialog(false));

            popNotification(
                "Oops! Something went wrong, please try again.",
                "danger",
                "Error",
                5000
            );
        }

        if (deleteStatus === 'success') {
            dispatch(toggleDeleteDialog(false));
            dispatch(getUser());
            dispatch(getWithdrawalData());

            popNotification(
                "Withdrawal account removed successfully",
                "success",
                "Success",
                5000
            );
        }

        if (deleteStatus === 'error' || deleteStatus === 'success') {
            dispatch(setDeleteStatus('idle'))
        }
    }, [deleteStatus, dispatch])

    const onRemove = () => {
        dispatch(removeAccount({ id: selectedAccount }))
    }

    return (
        <ConfirmDialog
            isOpen={deleteDialog}
            onClose={onClose}
            onRequestClose={onClose}
            type="danger"
            title="Remove Withdrawal Account?"
            buttonColor="red-500"
            loading={deleting}
            onCancel={onClose}
            onConfirm={onRemove}
        >
            <p>Do you confirm that you want to remove this withdrawal account?</p>
        </ConfirmDialog>
    )
}
export default RemoveAccount