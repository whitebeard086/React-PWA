import { injectReducer } from "store";
import reducer from "./store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequestsData } from "./store/dataSlice";
import GettingData from "./components/GettingData";
import { Avatar, Button, Card, Skeleton } from "components/ui";
import { Link } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import Enquiries from "./components/Enquiries";
import { BsThreeDotsVertical } from "react-icons/bs";

injectReducer("requests", reducer);

const Requests = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.requests?.data)

    useEffect(() => {
        dispatch(getRequestsData())
    }, [dispatch])

    return (
        <div className="mt-2 p-4">
            {loading ? (
                <GettingData />
            ):(
                <div>
                    <h4>Active Bookings</h4>

                    <div className="mt-4 mb-4">
                        <div className="min-h-[20vh] flex flex-col justify-center">
                            <p className="text-center text-gray-400 font-bold text-2xl">
                                You currently do not have <br /> any active bookings...
                            </p>
                        </div>
                    </div>

                    <h4>Enquiries</h4>

                    <Enquiries />
                </div>
            )}

            <div className="sticky bottom-24 flex justify-end mr-5">
                <Link to="history">
                    <Button
                        variant="solid"
                    >
                        Booking History
                    </Button>
                </Link>
            </div>
        </div>
    )
}
export default Requests