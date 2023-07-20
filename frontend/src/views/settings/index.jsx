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

injectReducer("settings", reducer);

const Settings = () => {
    const { handleSignOut } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrowseData());
    }, [dispatch]);

    const { userType } = useSelector((state) => state.auth.user);

    window.OneSignal = window.OneSignal || [];
    const OneSignal = window.OneSignal;

    OneSignal.push(() => {
        OneSignal.init(
            {
                appId: "9749386f-0c3b-417c-b986-3447a73296cd", //STEP 9
                allowLocalhostAsSecureOrigin: true,
                promptOptions: {
                    customlink: {
                        enabled: true /* Required to use the Custom Link */,
                        style: "button" /* Has value of 'button' or 'link' */,
                        size: "small" /* One of 'small', 'medium', or 'large' */,
                        color: {
                            button: "" /* Color of the button background if style = "button" */,
                            text: "#FFFFFF" /* Color of the prompt's text */,
                        },
                        text: {
                            subscribe:
                                "Subscribe to push notifications" /* Prompt's text when not subscribed */,
                            unsubscribe:
                                "Unsubscribe from push notifications" /* Prompt's text when subscribed */,
                        },
                        unsubscribeEnabled: true /* Controls whether the prompt is visible after subscription */,
                    },
                },
            },
        );
    });

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

                    <div className="onesignal-customlink-container"></div>

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
