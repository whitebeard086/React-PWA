import { injectReducer } from "@/store";
import reducer from "./store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui";
import { BiPlus } from "react-icons/bi";
import GettingData from "./components/GettingData";
import BankAccounts from "./components/BankAccounts";
import { useEffect } from "react";
import { getWithdrawalData } from "./store/dataSlice";
import { toggleAccountDialog } from "./store/stateSlice";
import NewAccountDialog from "./components/newAccount/NewAccountDialog";

injectReducer("withdraw", reducer);

const Withdraw = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.withdraw.data)

    useEffect(() => {
        dispatch(getWithdrawalData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onAddAccount = () => {
        dispatch(toggleAccountDialog(true));
    }

    return (
        <div className="mt-2 p-4">
            <div className="flex items-center gap-4 justify-between flex-wrap">
                <h4 className="text-lg font-bold text-gray-700">
                    Withdrawal Banks
                </h4>

                <Button
                    size="sm"
                    variant="solid"
                    disabled={loading}
                    icon={<BiPlus />}
                    onClick={onAddAccount}
                    className="!bg-gray-900 hover:!bg-black"
                >
                    Add Account
                </Button>
            </div>

            <div className="mt-4">
                {loading ? <GettingData /> : <BankAccounts />}
            </div>
            <NewAccountDialog />
        </div>
    )
}
export default Withdraw