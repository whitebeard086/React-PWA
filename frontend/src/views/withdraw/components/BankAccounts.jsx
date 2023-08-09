/* eslint-disable react/no-unescaped-entities */
import { Card } from "@/components/ui"
import { MdDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion";
import { setSelectedAccount, toggleDeleteDialog } from "../store/stateSlice";

const BankAccounts = () => {
    const dispatch = useDispatch();

    const { profile } = useSelector((state) => state.auth.user)
    
    const accounts = profile?.withdrawal_accounts

    const onRemoveAccount = (account) => {
        dispatch(setSelectedAccount(account.id));
        dispatch(toggleDeleteDialog(true));
        console.log(account);
    }

    return (
        <div>
            {accounts?.length < 1 ? (
                <div className="min-h-[30vh] grid place-content-center">
                    <p className="text-center text-gray-400 font-bold text-2xl">
                        You have not added <br /> any withdrawal accounts...
                    </p>
                </div>    
            ) : (
                <AnimatePresence>
                    <div className="flex flex-col">
                        {accounts?.map((account) => (
                            <motion.div
                                key={account.id}
                                layoutId={account.id}
                                initial={{
                                    opacity: 0,
                                    visibility: "hidden",
                                }}
                                animate={{
                                    opacity: 1,
                                    visibility: "visible",
                                }}
                                transition={{
                                    duration: 0.2,
                                    type: "tween",
                                }}
                                exit={{
                                    opacity: 0,
                                    visibility: "hidden",
                                }}
                            >
                                <Card clickable bodyClass="w-full">
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex flex-col w-full">
                                            <h4 className="text-base">{account.bank_name}</h4>
                                            <p className="text-base">{account.account_number}</p>
                                            <div className="lowercase">
                                                <p className="text-base capitalize">{account.account_name}</p>
                                            </div>
                                        </div>
                
                                        <div onClick={() => onRemoveAccount(account)} className="bg-gray-100 hover:bg-gray-200 transition duration-300 w-10 h-10 grid place-content-center rounded-full cursor-pointer hover:shadow-md">
                                            <MdDelete className="text-2xl text-red-500 hover:text-red-600 transition duration-300" />
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>
            )}
        </div>
    )
}
export default BankAccounts