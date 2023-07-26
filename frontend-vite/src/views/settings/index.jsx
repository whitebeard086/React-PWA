import { useDispatch, useSelector } from "react-redux";
import NewCategory from "./components/NewCategory";
import User from "./components/User";
import reducer from "./store";
import { injectReducer } from "store/index";
import { Link } from "react-router-dom";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import useAuth from "utils/hooks/useAuth";
import UpdateCategory from "./components/UpdateCategory";
import { useEffect } from "react";
import { getBrowseData } from "./store/dataSlice";
import { setEnabledNotifications } from "store/auth/userSlice";

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
    
    const { userType, enabledNotifications, profile } = useSelector((state) => state.auth.user);

    OneSignal.push(() => {
        OneSignal.init(
            {
                appId: process.env.REACT_APP_ONESIGNAL_APP_ID,
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
                            subscribe:
                                "Subscribe to push notifications",
                            unsubscribe:
                                "Unsubscribe from push notifications",
                        },
                        unsubscribeEnabled: true,
                    },
                },
            },
        );
    });

    const handleSubscriptionStatus = () => {
        OneSignal.push(function() {
            // OneSignal.setExternalUserId(profile?.id);
            OneSignal.isPushNotificationsEnabled(function(isEnabled) {
                if (isEnabled) {
                  console.log("Push notifications are enabled!");
                  OneSignal.setExternalUserId(profile?.id);
                  if (!enabledNotifications) {
                      dispatch(setEnabledNotifications(true));
                  }
                }else {
                  console.log("Push notifications are not enabled yet."); 
                  if(enabledNotifications){
                      dispatch(setEnabledNotifications(false));
                  }
                }
            });
        });
    }

    return (
        <div className="bg-white min-h-[80vh]">
            {/* <NewCategory /> */}
            <User />
            <hr />
            <div className="">
                <div>
                    {userType === "Service Provider" && (
                        <>
                            <Link
                                className="flex gap-2 items-center transition duration-300 w-full py-4 px-4 hover:bg-gray-100"
                                to="/profile"
                            >
                                <span className="text-xl opacity-50">
                                    <HiOutlineUser />
                                </span>
                                <span className="text-base font-semibold text-gray-600">
                                    Profile
                                </span>
                            </Link>
                        </>
                    )}
                    <hr className="" />

                    <div onClick={handleSubscriptionStatus} className="onesignal-customlink-container"></div>

                    <div
                        onClick={handleSignOut}
                        className="flex items-center gap-2 cursor-pointer transition duration-300 w-full py-4 px-4 hover:bg-gray-100"
                    >
                        <span className="text-xl text-red-500 opacity-50">
                            <HiOutlineLogout />
                        </span>
                        <span className="w-full text-base font-semibold text-red-500">
                            Sign Out
                        </span>
                    </div>
                </div>
            </div>

            {/* <UpdateCategory /> */}
        </div>
    );
};
export default Settings;
