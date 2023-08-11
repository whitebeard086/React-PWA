import { useDispatch, useSelector } from "react-redux";
import User from "./components/User";
import reducer from "./store";
import { injectReducer } from "@/store";
import { Link } from "react-router-dom";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import { useEffect } from "react";
import { getBrowseData } from "./store/dataSlice";
import useAuth from "@/utils/hooks/useAuth";
import { setEnabledNotifications } from "@/store/auth/userSlice";
import { toggleDepositDialog } from "../payments/store/stateSlice";

injectReducer("settings", reducer);

const Settings = () => {
    const { handleSignOut } = useAuth();
    const dispatch = useDispatch();

    window.OneSignal = window.OneSignal || [];
    const OneSignal = window.OneSignal;

    useEffect(() => {
        dispatch(getBrowseData());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { userType, enabledNotifications, profile } = useSelector(
        (state) => state.auth.user
    );

    OneSignal.push(() => {
        OneSignal.init({
            appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
            safari_web_id: import.meta.env.VITE_ONESIGNAL_SAFARI_WEB_ID,
            allowLocalhostAsSecureOrigin: true,
            autoResubscribe: true,
            promptOptions: {
                customlink: {
                    enabled: true,
                    style: "button",
                    size: "small",
                    color: {
                        button: "",
                        text: "#FFFFFF",
                    },
                    text: {
                        subscribe: "Subscribe to push notifications",
                        unsubscribe: "Unsubscribe from push notifications",
                    },
                    unsubscribeEnabled: true,
                },
            },
        });
    });

    const handleSubscriptionStatus = () => {
        OneSignal.push(function () {
            // OneSignal.setExternalUserId(profile?.id);
            OneSignal.isPushNotificationsEnabled(function (isEnabled) {
                if (isEnabled) {
                    console.log("Push notifications are enabled!");
                    OneSignal.setExternalUserId(profile?.id);
                    if (!enabledNotifications) {
                        dispatch(setEnabledNotifications(true));
                    }
                } else {
                    console.log("Push notifications are not enabled yet.");
                    if (enabledNotifications) {
                        dispatch(setEnabledNotifications(false));
                    }
                }
            });
        });
    };

    return (
        <div className="bg-white min-h-[80vh]">
            {/* <NewCategory /> */}
            <User />
            <hr />
            <div className="">
                <div>
                    <div onClick={() => dispatch(toggleDepositDialog(true))} className="flex items-center gap-2 transition duration-300 cursor-pointer w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2">
                        <div className="w-full flex flex-col">
                            <span className="text-base font-semibold text-gray-600">
                                Your Information
                            </span>
                            <p className="text xs">Account details</p>
                        </div>
                    </div>

                    <Link
                        className="flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2"
                        to="/transactions"
                    >
                        <div className="w-full flex flex-col">
                            <span className="text-base font-semibold text-gray-600">
                                Transactions
                            </span>
                            <p className="text xs">View your transaction history</p>
                        </div>
                    </Link>

                    {userType === "Provider" && (
                        <>
                            <Link
                                className="flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2"
                                to="/profile"
                            >
                                <div className="w-full flex flex-col">
                                    <span className="text-base font-semibold text-gray-600">
                                        Provider Profile
                                    </span>
                                    <p className="text xs">Edit your service provider profile</p>
                                </div>
                            </Link>
                        </>
                    )}

                    {userType === "Provider" && (
                        <>
                            <Link
                                className="flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2"
                                to="/withdraw"
                            >
                                <div className="w-full flex flex-col">
                                    <span className="text-base font-semibold text-gray-600">
                                        Withdrawal Banks
                                    </span>
                                    <p className="text xs">Add or Remove Bank Accounts</p>
                                </div>
                            </Link>
                        </>
                    )}

                    <Link
                        className="flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2"
                        to="/transaction-pin"
                    >
                        <div className="w-full flex flex-col">
                            <span className="text-base font-semibold text-gray-600">
                                Change PIN
                            </span>
                            <p className="text xs">Change your transaction pin</p>
                        </div>
                    </Link>

                    <Link
                        className="flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2"
                        to="/help-&-support"
                    >
                        <div className="w-full flex flex-col">
                            <span className="text-base font-semibold text-gray-600">
                                Help & Support
                            </span>
                        </div>
                    </Link>

                    <Link
                        className="flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2"
                        to="/t-&-c"
                    >
                        <div className="w-full flex flex-col">
                            <span className="text-base font-semibold text-gray-600">
                                Terms & Conditions
                            </span>
                        </div>
                    </Link>

                    <Link
                        className="flex items-center gap-2 transition duration-300 w-full py-4 px-4 hover:bg-gray-100 border-b-gray-200 border-b-2"
                        to="/privacy-policy"
                    >
                        <div className="w-full flex flex-col">
                            <span className="text-base font-semibold text-gray-600">
                                Privacy Policy
                            </span>
                        </div>
                    </Link>

                    <div
                        onClick={handleSubscriptionStatus}
                        className="onesignal-customlink-container"
                    ></div>

                    <div
                        onClick={handleSignOut}
                        className="flex items-center gap-2 cursor-pointer transition duration-300 w-full py-4 px-4 hover:bg-gray-100"
                    >
                        <span className="text-xl text-red-500 opacity-50">
                            <HiOutlineLogout />
                        </span>
                        <span className="w-full text-base font-semibold text-red-500">
                            Logout
                        </span>
                    </div>
                </div>
            </div>

            {/* <UpdateCategory /> */}
        </div>
    );
};
export default Settings;
