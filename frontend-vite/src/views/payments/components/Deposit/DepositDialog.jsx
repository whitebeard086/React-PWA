import { Dialog } from "components/ui";
import { useDispatch, useSelector } from "react-redux"
import { toggleDepositDialog } from "views/payments/store/stateSlice";
import DepositForm from "./DepositForm";

const DepositDialog = () => {
    const dispatch = useDispatch();
    const { depositDialog } = useSelector((state) => state.payments.state)

    const onDialogClose = () => {
        dispatch(toggleDepositDialog(false));
    }

    return (
        <>
            <Dialog
                isOpen={depositDialog}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                contentClassName="mt-[30vh]"
                title="Deposit"
            >
                <h4 className="text-lg font-bold text-gray-700">Top Up Your Account</h4>
                <div className="mt-4 overflow-y-auto">
                    <DepositForm />
                </div>
            </Dialog>
        </>
    )
}
export default DepositDialog