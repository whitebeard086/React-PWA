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
import classNames from "classnames";
import appConfig from "configs/app.config";

injectReducer("requests", reducer);

const Requests = () => {
    const dispatch = useDispatch();
    const { imagePath } = appConfig;

    const { loading, bookings } = useSelector((state) => state.requests?.data)
    const { userType } = useSelector((state) => state.auth.user)
    const isProvider = userType === "Service Provider" ? true : false

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
                        {bookings?.length < 1 ? (
                            <div className="min-h-[20vh] flex flex-col justify-center">
                                <p className="text-center text-gray-400 font-bold text-2xl">
                                    You currently do not have <br /> any active bookings...
                                </p>
                            </div>
                        ):(
                            <div className="mt-4 mb-4 flex gap-4 overflow-auto pb-4">
                                {bookings?.map((item) => (
                                    isProvider ? (
                                        <Card id={item.id} className={classNames(item.service_status === 'ongoing' && "min-w-[23rem] w-[23rem]")} bodyClass="flex w-full flex-col justify-center items-center">
                                            <div className="w-full flex items-center gap-4 justify-between">
                                                <div className="w-fit flex flex-col items-center gap-1">
                                                    <Avatar 
                                                        size="lg"
                                                        shape="circle"
                                                        icon={<HiOutlineUser />}
                                                        src={`${imagePath}/${item?.user?.image}`}
                                                    />
                                                    
                                                    <h4 className="font-semibold text-base">
                                                        {`${item?.user?.first_name} ${item?.user?.last_name}`}
                                                    </h4>
                                                </div>

                                                <div>
                                                    {item?.service_status === 'ongoing' && (
                                                        <p className={classNames("text-sm font-semibold text-primary-500 flex flex-col items-center justify-center w-fit leading-tight")}>
                                                            <span>Service</span>
                                                            <span>Ongoing</span>
                                                        </p>
                                                    )}
                                                    {item?.service_status === 'completed' && (
                                                        <p className={classNames("text-sm font-semibold flex flex-col items-center justify-center w-fit")}>
                                                            <span>Awaiting</span>
                                                            <span>Confirmation</span>
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    {item?.service_status === 'ongoing' && (
                                                        <Button
                                                            variant="solid"
                                                            size="sm"
                                                            color="blue-500"
                                                        >
                                                            I'm Done
                                                        </Button>
                                                    )}
                                                    {item?.service_status === 'completed' && (
                                                        <Button
                                                            variant="solid"
                                                            size="sm"
                                                            color="red-500"
                                                        >
                                                            Report
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    ) : (
                                        <Card id={item.id} className={classNames(item.service_status === 'ongoing' && "min-w-[18rem] w-80", item.service_status === 'complete' && "min-w-[23rem] w-[23rem]")} bodyClass="flex w-full flex-col justify-center items-center">
                                            <div className="w-full flex items-center gap-6 justify-between">
                                                <div className="w-fit flex flex-col items-center gap-1">
                                                    <Avatar 
                                                        size="lg"
                                                        shape="circle"
                                                        icon={<HiOutlineUser />}
                                                        src={`${imagePath}/${item?.service?.banner}`}
                                                    />

                                                    <h4 className="font-semibold text-base">
                                                        {`${item?.service?.title}`}
                                                    </h4>
                                                </div>

                                                <div>
                                                    {item?.service_status === 'ongoing' && (
                                                        <p className={classNames("text-sm font-semibold text-primary-500 flex flex-col items-center justify-center w-fit leading-tight")}>
                                                            <span>Service</span>
                                                            <span>Ongoing</span>
                                                        </p>
                                                    )}
                                                    {item?.service_status === 'completed' && (
                                                        <p className={classNames("text-sm font-semibold flex flex-col items-center justify-center w-fit")}>
                                                            <span>Service</span>
                                                            <span>Completed</span>
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    {item?.service_status === 'completed' && (
                                                        <Button
                                                            variant="solid"
                                                            size="sm"
                                                            color="blue-500"
                                                        >
                                                            Confirm
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </Card>
                                    )
                                    
                                ))}
                            </div>
                        )}
                    </div>

                    <h4>Enquiries</h4>

                    <div className="min-h-[50vh]">
                        <Enquiries />
                    </div>
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