import { injectReducer } from "@/store";
import reducer from "./store";
import { useSelector } from "react-redux";
import CreatePin from "./components/create";
import UpdatePin from "./components/update";

injectReducer("pin", reducer);

const Pin = () => {
    const { hasPin } = useSelector((state) => state.auth.user)

    return (
        <div className="mt-2 p-4">
            {hasPin ? (
                <div>
                    <h4 className="text-lg font-bold text-gray-700 mb-4">
                        Update Your Transaction PIN
                    </h4>

                    <div className="mt-4">
                        <UpdatePin />
                    </div>
                </div>
            ) : (
                <div>
                    <h4 className="text-lg font-bold text-gray-700 mb-4">
                        Create Your Transaction PIN
                    </h4>

                    <div className="mt-4">
                        <CreatePin />
                    </div>
                </div>
            )}
        </div>
    )
}
export default Pin