import { useSelector } from "react-redux";
import NewCategory from "./components/NewCategory"
import User from "./components/User";
import reducer from "./store";
import { injectReducer } from "store/index";
import { Link } from "react-router-dom";
import { HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import useAuth from "utils/hooks/useAuth";

injectReducer("settings", reducer);

const Settings = () => {
    const { handleSignOut } = useAuth();

    const { userType } = useSelector((state) => state.auth.user)

    return (
        <div className="bg-white min-h-[80vh] p-4">
            {/* <NewCategory /> */}
            <User />
            <hr />
            <div className="">
                <div>
                    {userType === "Service Provider" && (
                        <>
                            <Link className="flex gap-2 items-center transition duration-300 rounded-md w-full py-4 px-2 hover:bg-gray-100" to="/profile">
                                <span className="text-xl opacity-50"><HiOutlineUser /></span>
                                <span className="text-base font-semibold text-gray-600">Profile</span>
                            </Link>
                            <hr className="" />
                        </>
                    )}

                    <div onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer transition duration-300 rounded-md w-full py-4 px-2 hover:bg-gray-100">
                        <span className="text-xl text-red-500 opacity-50">
                            <HiOutlineLogout />
                        </span>
                        <span className="w-full text-base font-semibold text-red-500">Sign Out</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Settings