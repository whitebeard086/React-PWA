import { Button, Card, Dialog, Notification, toast } from "components/ui";
import { useDispatch, useSelector } from "react-redux"
import { toggleDepositDialog } from "views/payments/store/stateSlice";
import { HiOutlineDuplicate } from "react-icons/hi";
import { paymentsData } from "views/payments/store/dataSlice";
import { getUser } from "store/auth/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const DepositDialog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { depositDialog } = useSelector((state) => state.payments.state)
    const { profile } = useSelector((state) => state.auth.user)

    const onDialogClose = () => {
        dispatch(toggleDepositDialog(false));
    }

    const onDone = () => {
        dispatch(toggleDepositDialog(false));
        dispatch(paymentsData())
        dispatch(getUser())

        if (location.pathname !== '/transactions') {
            navigate('/transactions')
        }
    }

    const handleCopyClick = (account = '') => {
        navigator.clipboard.writeText(account)
        toast.push(
            <Notification title="Copied" type="success" duration={1000} />,
            {
                placement: 'top-center',
            }
        )
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
                <h4 className="text-lg font-bold text-gray-700 text-center">Topup Your Account</h4>
                <div className="mt-4 overflow-y-auto">
                    {/* <DepositForm /> */}
                    <p className="text-base text-center">You can fund your account via your personal Taskitly virtual account</p>

                        {!profile?.bank ? (
                            <Card className='bg-primary-500 text-white mt-4'>
                                <p className="text-base font-semibold text-center p-4">We could not retrieve your dedicated account at the moment, please try again later or contact our customer support for help.</p>
                            </Card>
                        ) : (
                            <>
                                <Card className='bg-primary-500 text-white mt-4'>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-base text-center">{profile?.bank}</p>
                                        <div className="text-base flex flex-col justify-center items-center cursor-pointer" onClick={() => handleCopyClick(profile?.virtual_acc)}>
                                            <p className="font-bold text-center">{profile?.virtual_acc}</p>
                                            <div className="flex items-center gap-">
                                                <p className="text sm">copy</p>
                                                <HiOutlineDuplicate className="text-lg" />
                                            </div>
                                        </div>
                                        <p className="text-base text-center font-semibold">
                                            {`${profile?.first_name} ${profile?.last_name}`}
                                        </p>

                                        <Button variant="solid" block className="!bg-gray-900 hover:!bg-black mt-6" onClick={onDone}>
                                            Done, check my deposits
                                        </Button>
                                    </div>
                                </Card>
                            </>
                        )}
                </div>
            </Dialog>
        </>
    )
}
export default DepositDialog