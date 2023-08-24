import { Avatar, Button, Dialog } from "@/components/ui";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { setVerify } from "@/store/auth/userSlice";

const GoVerify = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { verificationPrompt } = useSelector((state) => state.auth.user);

    const onCancel = () => {
        dispatch(setVerify(false));
    };

    const onGoVerify = () => {
        dispatch(setVerify(false));
        navigate("/welcome");
    };

    return (
        <Dialog
            isOpen={verificationPrompt}
            onClose={onCancel}
            onRequestClose={onCancel}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            style={{
                marginTop: 250,
            }}
            contentClassName="pb-0 px-0"
        >
            <div className="px-6 pb-6 pt-2 flex">
                <div>
                    <Avatar
                        className="text-amber-600 bg-amber-100 dark:text-amber-100"
                        shape="circle"
                    >
                        <span className="text-2xl">
                            <HiOutlineExclamationCircle />
                        </span>
                    </Avatar>
                </div>
                <div className="ml-4 rtl:mr-4">
                    <h5 className="mb-2">
                        Full Identity Verification Required!
                    </h5>
                    <p>
                        We need to fully verify your identity before you can
                        complete this action. Please take a moment to complete
                        your identity verification.
                    </p>
                </div>
            </div>
            <div className="text-right px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-bl-lg rounded-br-lg">
                <Button
                    size="sm"
                    className="ltr:mr-2 rtl:ml-2"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    size="sm"
                    variant="solid"
                    onClick={onGoVerify}
                    // color={confirmButtonColor}
                >
                    Continue Verification
                </Button>
            </div>
        </Dialog>
    );
};
export default GoVerify;
