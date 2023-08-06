import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Button, Spinner } from "@/components/ui";
import { Container } from "@/components/shared";
import { FaSpinner } from "react-icons/fa";
import { useEffect } from "react";
import classNames from "classnames";
import { toggleDepositDialog } from "../payments/store/stateSlice";
import { getUser } from "@/store/auth/userSlice";
import { socket } from "@/utils/socket";
import { setMessages } from "../chat/store/dataSlice";
import DepositDialog from "../payments/components/Deposit/DepositDialog";

const Layout = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { profile, userType } = useSelector(
        (state) => state.auth.user
    );
    const { verifying } = useSelector((state) => state.payments.data);
    const { chat, messageStatus, sentMessage } = useSelector(
        (state) => state.chat.data
    );

    const receiver =
        profile?.id === chat?.user?.id ? chat?.receiver : chat?.user;

    const onTopUp = () => {
        dispatch(toggleDepositDialog(true));
    };

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch, location]);

    // Send message to the socket server
    useEffect(() => {
        if (messageStatus === "sent") {
            socket.emit(
                "sendMessage",
                [sentMessage, receiver?.id],
                console.log("Emit send message: ", true)
            );
            dispatch(setMessages(sentMessage));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageStatus, sentMessage]);

    return (
        <Container className="max-w-2xl w-full">
            <Header />
            <div className="bg-white pb-4">
                <div className="bg-primary-500 w-[96%] mx-auto rounded-2xl py-3 px-4 flex items-center gap-4 justify-between">
                    <h2 className="text-xl font-bold text-emerald-50">
                        {verifying ? (
                            <Spinner
                                indicator={FaSpinner}
                                className="mr-4"
                                color="emerald-50"
                                size="25px"
                            />
                        ) : (
                            `₦${profile?.balance?.toLocaleString()}`
                        )}
                    </h2>

                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="solid"
                            className="!bg-gray-900 hover:!bg-black"
                            onClick={onTopUp}
                            disabled={verifying}
                        >
                            Topup
                        </Button>
                        {userType === "Provider" && (
                            <Button
                                size="sm"
                                variant="solid"
                                disabled={verifying}
                                className="!bg-gray-900 hover:!bg-black"
                            >
                                Withdraw
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className={classNames("bg-gray-100 min-h-[72vh]")}>
                <Outlet />
            </div>
            <Footer />

            <DepositDialog />
        </Container>
    );
};
export default Layout;
