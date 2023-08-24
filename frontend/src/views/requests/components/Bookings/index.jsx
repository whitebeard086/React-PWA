/* eslint-disable react/prop-types */
import classNames from "classnames";
import { Avatar, Button, Card } from "@/components/ui";
import { HiOutlineUser } from "react-icons/hi";
import { Loading } from "@/components/shared";

const Bookings = ({
    imagePath,
    bookingID,
    bookings,
    booking,
    isProvider,
    completingService,
    confirmingService,
    onComplete,
    onConfirm,
}) => {
    return (
        <div>
            {bookings?.length < 1 ? (
                <div className="min-h-[20vh] flex flex-col justify-center">
                    <p className="text-center text-gray-400 font-bold text-2xl">
                        You currently do not have <br /> any active bookings...
                    </p>
                </div>
            ) : (
                <div className="mt-4 mb-4 flex gap-4 overflow-auto pb-4">
                    {bookings?.map((item) =>
                        isProvider ? (
                            item.id === bookingID ? (
                                completingService ? (
                                    <Card
                                        key={item?.id}
                                        className={classNames(
                                            item.service_status === "ongoing" &&
                                                "min-w-[23rem] w-[23rem]"
                                        )}
                                        bodyClass="flex w-full flex-col justify-center items-center"
                                    >
                                        <div className="w-full flex items-center h-24 justify-center gap-4 ">
                                            <Loading loading />
                                        </div>
                                    </Card>
                                ) : booking.id ? (
                                    <Card
                                        key={item.id}
                                        className={classNames(
                                            "min-w-[23rem] w-[23rem]"
                                        )}
                                        bodyClass="flex w-full flex-col justify-center items-center"
                                    >
                                        <div className="w-full flex items-center gap-4 justify-between">
                                            <div className="w-fit flex flex-col items-center gap-1">
                                                <Avatar
                                                    size="lg"
                                                    shape="circle"
                                                    icon={<HiOutlineUser />}
                                                    src={`${imagePath}/${booking?.user?.image}`}
                                                />

                                                <h4 className="font-semibold text-base">
                                                    {`${booking?.user?.first_name} ${booking?.user?.last_name}`}
                                                </h4>
                                            </div>

                                            <div>
                                                {booking?.service_status ===
                                                    "ongoing" && (
                                                    <p
                                                        className={classNames(
                                                            "text-sm font-semibold text-primary-500 flex flex-col items-center justify-center w-fit leading-tight"
                                                        )}
                                                    >
                                                        <span>Service</span>
                                                        <span>Ongoing</span>
                                                    </p>
                                                )}
                                                {booking?.service_status ===
                                                    "completed" && (
                                                    <p
                                                        className={classNames(
                                                            "text-sm font-semibold flex flex-col items-center justify-center w-fit"
                                                        )}
                                                    >
                                                        <span>Awaiting</span>
                                                        <span>
                                                            Confirmation
                                                        </span>
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                {booking?.service_status ===
                                                    "ongoing" && (
                                                    <Button
                                                        variant="solid"
                                                        size="sm"
                                                        color="blue-500"
                                                        onClick={() =>
                                                            onComplete(booking)
                                                        }
                                                    >
                                                        I'm Done
                                                    </Button>
                                                )}
                                                {booking?.service_status ===
                                                    "completed" && (
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
                                    <Card
                                        key={item.id}
                                        className={classNames(
                                            item.service_status === "ongoing" &&
                                                "min-w-[23rem] w-[23rem]"
                                        )}
                                        bodyClass="flex w-full flex-col justify-center items-center"
                                    >
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
                                                {item?.service_status ===
                                                    "ongoing" && (
                                                    <p
                                                        className={classNames(
                                                            "text-sm font-semibold text-primary-500 flex flex-col items-center justify-center w-fit leading-tight"
                                                        )}
                                                    >
                                                        <span>Service</span>
                                                        <span>Ongoing</span>
                                                    </p>
                                                )}
                                                {item?.service_status ===
                                                    "completed" && (
                                                    <p
                                                        className={classNames(
                                                            "text-sm font-semibold flex flex-col items-center justify-center w-fit"
                                                        )}
                                                    >
                                                        <span>Awaiting</span>
                                                        <span>
                                                            Confirmation
                                                        </span>
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                {item?.service_status ===
                                                    "ongoing" && (
                                                    <Button
                                                        variant="solid"
                                                        size="sm"
                                                        color="blue-500"
                                                        onClick={() =>
                                                            onComplete(item)
                                                        }
                                                    >
                                                        I'm Done
                                                    </Button>
                                                )}
                                                {item?.service_status ===
                                                    "completed" && (
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
                                )
                            ) : (
                                <Card
                                    key={item.id}
                                    className={classNames(
                                        "min-w-[23rem] w-[23rem]"
                                    )}
                                    bodyClass="flex w-full flex-col justify-center items-center"
                                >
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
                                            {item?.service_status ===
                                                "ongoing" && (
                                                <p
                                                    className={classNames(
                                                        "text-sm font-semibold text-primary-500 flex flex-col items-center justify-center w-fit leading-tight"
                                                    )}
                                                >
                                                    <span>Service</span>
                                                    <span>Ongoing</span>
                                                </p>
                                            )}
                                            {item?.service_status ===
                                                "completed" && (
                                                <p
                                                    className={classNames(
                                                        "text-sm font-semibold flex flex-col items-center justify-center w-fit"
                                                    )}
                                                >
                                                    <span>Awaiting</span>
                                                    <span>Confirmation</span>
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            {item?.service_status ===
                                                "ongoing" && (
                                                <Button
                                                    variant="solid"
                                                    size="sm"
                                                    color="blue-500"
                                                    onClick={() =>
                                                        onComplete(item)
                                                    }
                                                >
                                                    I'm Done
                                                </Button>
                                            )}
                                            {item?.service_status ===
                                                "completed" && (
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
                            )
                        ) : item.id === bookingID ? (
                            confirmingService ? (
                                <Card
                                    key={item.id}
                                    className={classNames(
                                        item.service_status === "completed" &&
                                            "min-w-[23rem] w-[23rem]"
                                    )}
                                    bodyClass="flex w-full flex-col justify-center items-center"
                                >
                                    <div className="w-full flex items-center h-24 justify-center gap-4 ">
                                        <Loading loading />
                                    </div>
                                </Card>
                            ) : booking.id ? (
                                <Card
                                    key={item.id}
                                    className={classNames(
                                        item.service_status === "ongoing" &&
                                            "min-w-[18rem] w-80",
                                        item.service_status === "completed" &&
                                            "min-w-[30rem] w-[30rem]"
                                    )}
                                    bodyClass="flex w-full flex-col justify-center items-center"
                                >
                                    <div className="w-full flex items-center gap-6 justify-between">
                                        <div className="w-fit flex flex-col items-center gap-1">
                                            <Avatar
                                                size="lg"
                                                shape="circle"
                                                icon={<HiOutlineUser />}
                                                src={`${imagePath}/${booking?.service?.banner}`}
                                            />

                                            <h4 className="font-semibold text-base">
                                                {`${booking?.service?.title}`}
                                            </h4>
                                        </div>

                                        <div>
                                            {booking?.service_status ===
                                                "ongoing" && (
                                                <p
                                                    className={classNames(
                                                        "text-sm font-semibold text-primary-500 flex flex-col items-center justify-center w-fit leading-tight"
                                                    )}
                                                >
                                                    <span>Service</span>
                                                    <span>Ongoing</span>
                                                </p>
                                            )}
                                            {booking?.service_status ===
                                                "completed" && (
                                                <p
                                                    className={classNames(
                                                        "text-sm font-semibold flex flex-col items-center justify-center w-fit"
                                                    )}
                                                >
                                                    <span>Service</span>
                                                    <span>Completed</span>
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            {booking?.service_status ===
                                                "completed" && (
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="solid"
                                                        size="sm"
                                                        color="blue-500"
                                                        onClick={() =>
                                                            onConfirm(booking)
                                                        }
                                                    >
                                                        Confirm
                                                    </Button>
                                                    <Button
                                                        variant="solid"
                                                        size="sm"
                                                        color="red-500"
                                                    >
                                                        Report
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            ) : (
                                <Card
                                    key={item.id}
                                    className={classNames(
                                        item.service_status === "ongoing" &&
                                            "min-w-[18rem] w-80",
                                        item.service_status === "completed" &&
                                            "min-w-[30rem] w-[30rem]"
                                    )}
                                    bodyClass="flex w-full flex-col justify-center items-center"
                                >
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
                                            {item?.service_status ===
                                                "ongoing" && (
                                                <p
                                                    className={classNames(
                                                        "text-sm font-semibold text-primary-500 flex flex-col items-center justify-center w-fit leading-tight"
                                                    )}
                                                >
                                                    <span>Service</span>
                                                    <span>Ongoing</span>
                                                </p>
                                            )}
                                            {item?.service_status ===
                                                "completed" && (
                                                <p
                                                    className={classNames(
                                                        "text-sm font-semibold flex flex-col items-center justify-center w-fit"
                                                    )}
                                                >
                                                    <span>Service</span>
                                                    <span>Completed</span>
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            {item?.service_status ===
                                                "completed" && (
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="solid"
                                                        size="sm"
                                                        color="blue-500"
                                                        onClick={() =>
                                                            onConfirm(item)
                                                        }
                                                    >
                                                        Confirm
                                                    </Button>
                                                    <Button
                                                        variant="solid"
                                                        size="sm"
                                                        color="red-500"
                                                    >
                                                        Report
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            )
                        ) : (
                            <Card
                                key={item.id}
                                className={classNames(
                                    item.service_status === "ongoing" &&
                                        "min-w-[18rem] w-80",
                                    item.service_status === "completed" &&
                                        "min-w-[30rem] w-[30rem]"
                                )}
                                bodyClass="flex w-full flex-col justify-center items-center"
                            >
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
                                        {item?.service_status === "ongoing" && (
                                            <p
                                                className={classNames(
                                                    "text-sm font-semibold text-primary-500 flex flex-col items-center justify-center w-fit leading-tight"
                                                )}
                                            >
                                                <span>Service</span>
                                                <span>Ongoing</span>
                                            </p>
                                        )}
                                        {item?.service_status ===
                                            "completed" && (
                                            <p
                                                className={classNames(
                                                    "text-sm font-semibold flex flex-col items-center justify-center w-fit"
                                                )}
                                            >
                                                <span>Service</span>
                                                <span>Completed</span>
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        {item?.service_status ===
                                            "completed" && (
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="solid"
                                                    size="sm"
                                                    color="blue-500"
                                                    onClick={() =>
                                                        onConfirm(item)
                                                    }
                                                >
                                                    Confirm
                                                </Button>
                                                <Button
                                                    variant="solid"
                                                    size="sm"
                                                    color="red-500"
                                                >
                                                    Report
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        )
                    )}
                </div>
            )}
        </div>
    );
};
export default Bookings;
