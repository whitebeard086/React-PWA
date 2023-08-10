import { useDispatch, useSelector } from "react-redux";
import { toggleWithdrawDialog } from "../../store/stateSlice";
import { Dialog } from "@/components/ui";
import WithdrawForm from "./Form";

const WithdrawDialog = () => {
    const dispatch = useDispatch();

    const { withdrawDialog } = useSelector((state) => state.withdraw.state)

    const onDialogClose = () => {
        dispatch(toggleWithdrawDialog(false));
    }
    return (
        <Dialog
            isOpen={withdrawDialog}
            onClose={onDialogClose}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            scrollable
            className="overflow-y-auto"
            bodyOpenClassName="overflow-hidden"
            contentClassName="mt-[30vh]"
            title="Withdraw"
        >
            <h4 className="text-lg font-bold text-gray-700">Withdraw Funds</h4>
            <div className="mt-4 overflow-y-auto">
                <WithdrawForm />
            </div>
        </Dialog>
    )
}
export default WithdrawDialog