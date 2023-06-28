import {
    AiOutlineFileSearch,
    AiOutlineHome,
    AiOutlineSetting,
} from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Footer = () => {
    const { userType } = useSelector((state) => state.auth.user)

    return (
        <div className="sticky max-w-full min-w-full w-full bottom-0 bg-white flex gap-1 p-3 justify-between">
            <NavLink
                to="/home"
                className={({ isActive }) =>
                    isActive
                        ? "bg-emerald-50 text-emerald-500 flex flex-col items-center p-2 rounded-md shadow-md font-bold"
                        : "flex flex-col items-center p-2 rounded-md font-semibold"
                }
            >
                <AiOutlineHome className="text-2xl" />
                <p className="text-xs sm:text-sm">Home</p>
            </NavLink>
            {userType === "Normal User" && (
                <NavLink
                    to="/browse"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-emerald-50 text-emerald-500 flex flex-col items-center p-2 rounded-md shadow-md font-bold"
                            : "flex flex-col items-center p-2 rounded-md font-semibold"
                    }
                >
                    <AiOutlineFileSearch className="text-2xl" />
                    <p className="text-xs sm:text-sm">Browse</p>
                </NavLink>
            )}
            {userType === "Service Provider" && (
                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-emerald-50 text-emerald-500 flex flex-col items-center p-2 rounded-md shadow-md font-bold"
                            : "flex flex-col items-center p-2 rounded-md font-semibold"
                    }
                >
                    <AiOutlineFileSearch className="text-2xl" />
                    <p className="text-xs sm:text-sm">History</p>
                </NavLink>
            )}
            <NavLink
                to="/requests"
                className={({ isActive }) =>
                    isActive
                        ? "bg-emerald-50 text-emerald-500 flex flex-col items-center p-2 rounded-md shadow-md font-bold"
                        : "flex flex-col items-center p-2 rounded-md font-semibold"
                }
            >
                <VscGitPullRequestGoToChanges className="text-2xl" />
                <p className="text-xs sm:text-sm">Requests</p>
            </NavLink>
            {userType === "Normal User" && (
                <NavLink
                    to="/payments"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-emerald-50 text-emerald-500 flex flex-col items-center p-2 rounded-md shadow-md font-bold"
                            : "flex flex-col items-center p-2 rounded-md font-semibold"
                    }
                >
                    <MdPayment className="text-2xl" />
                    <p className="text-xs sm:text-sm">Payments</p>
                </NavLink>
            )}
            {userType === "Service Provider" && (
                <NavLink
                    to="/withdrawals"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-emerald-50 text-emerald-500 flex flex-col items-center p-2 rounded-md shadow-md font-bold"
                            : "flex flex-col items-center p-2 rounded-md font-semibold"
                    }
                >
                    <MdPayment className="text-2xl" />
                    <p className="text-xs sm:text-sm">Withdrawals</p>
                </NavLink>
            )}
            <NavLink
                to="/settings"
                className={({ isActive }) =>
                    isActive
                        ? "bg-emerald-50 text-emerald-500 flex flex-col items-center p-2 rounded-md shadow-md font-bold"
                        : "flex flex-col items-center p-2 rounded-md font-semibold"
                }
            >
                <AiOutlineSetting className="text-2xl" />
                <p className="text-xs sm:text-sm">Settings</p>
            </NavLink>
        </div>
    );
};
export default Footer;
