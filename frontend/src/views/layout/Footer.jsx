import {
    AiOutlineFileSearch,
    AiOutlineHome,
    AiOutlineSetting,
} from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <div className="sticky bottom-0 bg-white flex gap-4 p-3 justify-between">
            <NavLink
                to="/home"
                className={({ isActive }) =>
                    isActive
                        ? "bg-emerald-50 text-emerald-500 flex flex-col items-center p-2 rounded-md shadow-md font-bold"
                        : "flex flex-col items-center p-2 rounded-md font-semibold"
                }
            >
                <AiOutlineHome className="text-2xl" />
                <p className="text-sm">Home</p>
            </NavLink>
            <NavLink
                to="/explore"
                className={({ isActive }) =>
                    isActive
                        ? "bg-emerald-50 text-emerald-500 flex flex-col items-center p-2 rounded-md shadow-md font-bold"
                        : "flex flex-col items-center p-2 rounded-md font-semibold"
                }
            >
                <AiOutlineFileSearch className="text-2xl" />
                <p className="text-sm">Explore</p>
            </NavLink>
            <NavLink
                to="/requests"
                className={({ isActive }) =>
                    isActive
                        ? "bg-emerald-50 text-emerald-500 flex flex-col items-center p-2 rounded-md shadow-md font-bold"
                        : "flex flex-col items-center p-2 rounded-md font-semibold"
                }
            >
                <VscGitPullRequestGoToChanges className="text-2xl" />
                <p className="text-sm">Requests</p>
            </NavLink>
            <NavLink
                to="/payments"
                className={({ isActive }) =>
                    isActive
                        ? "bg-emerald-50 text-emerald-500 flex flex-col items-center p-2 rounded-md shadow-md font-bold"
                        : "flex flex-col items-center p-2 rounded-md font-semibold"
                }
            >
                <MdPayment className="text-2xl" />
                <p className="text-sm">Payments</p>
            </NavLink>
            <NavLink
                to="/settings"
                className={({ isActive }) =>
                    isActive
                        ? "bg-emerald-50 text-emerald-500 flex flex-col items-center p-2 rounded-md shadow-md font-bold"
                        : "flex flex-col items-center p-2 rounded-md font-semibold"
                }
            >
                <AiOutlineSetting className="text-2xl" />
                <p className="text-sm">Settings</p>
            </NavLink>
        </div>
    );
};
export default Footer;
