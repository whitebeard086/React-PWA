import { Avatar, Card, Skeleton } from "@/components/ui";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";

const GettingData = () => {
    return (
        <div>
            <h4>Active Bookings</h4>

            <div className="mt-4 mb-4 flex gap-4 overflow-auto pb-4">
                <Card
                    className="min-w-[10rem] w-40"
                    bodyClass="flex w-full flex-col justify-center items-center"
                >
                    <Avatar size="lg" shape="circle" icon={<HiOutlineUser />} />

                    <div className="mt-2 flex flex-col gap-1 justify-center items-center w-full">
                        <Skeleton width="80%" />
                        <Skeleton width="100%" />
                    </div>
                </Card>

                <Card
                    className="min-w-[10rem] w-40"
                    bodyClass="flex w-full flex-col justify-center items-center"
                >
                    <Avatar size="lg" shape="circle" icon={<HiOutlineUser />} />

                    <div className="mt-2 flex flex-col gap-1 justify-center items-center w-full">
                        <Skeleton width="80%" />
                        <Skeleton width="100%" />
                    </div>
                </Card>

                <Card
                    className="min-w-[18rem] w-80"
                    bodyClass="flex w-full flex-col justify-center items-center"
                >
                    <div className="w-full flex items-center gap-4">
                        <div className="w-1/2 flex flex-col items-center">
                            <Avatar
                                size="lg"
                                shape="circle"
                                icon={<HiOutlineUser />}
                            />

                            <div className="mt-2 flex flex-col gap-1 justify-center items-center w-full">
                                <Skeleton width="80%" />
                                <Skeleton width="100%" />
                            </div>
                        </div>

                        <Skeleton width="50%" height="30px" />
                    </div>
                </Card>
            </div>

            <h4>Enquiries</h4>

            <div className="mt-4">
                <Card className="rounded-none">
                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex gap-4 items-center">
                            <div>
                                <Avatar
                                    size="lg"
                                    shape="circle"
                                    icon={<HiOutlineUser />}
                                />
                            </div>

                            <div className="mt-2 flex flex-col gap-1 justify-center w-full">
                                <Skeleton width="40%" />
                                <Skeleton width="60%" />
                            </div>
                        </div>

                        <BsThreeDotsVertical className="text-xl" />
                    </div>
                </Card>
                <Card className="rounded-none">
                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex gap-4 items-center">
                            <div>
                                <Avatar
                                    size="lg"
                                    shape="circle"
                                    icon={<HiOutlineUser />}
                                />
                            </div>

                            <div className="mt-2 flex flex-col gap-1 justify-center w-full">
                                <Skeleton width="40%" />
                                <Skeleton width="60%" />
                            </div>
                        </div>

                        <BsThreeDotsVertical className="text-xl" />
                    </div>
                </Card>
                <Card className="rounded-none">
                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex gap-4 items-center">
                            <div>
                                <Avatar
                                    size="lg"
                                    shape="circle"
                                    icon={<HiOutlineUser />}
                                />
                            </div>

                            <div className="mt-2 flex flex-col gap-1 justify-center w-full">
                                <Skeleton width="40%" />
                                <Skeleton width="60%" />
                            </div>
                        </div>

                        <BsThreeDotsVertical className="text-xl" />
                    </div>
                </Card>
                <Card className="rounded-none">
                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex gap-4 items-center">
                            <div>
                                <Avatar
                                    size="lg"
                                    shape="circle"
                                    icon={<HiOutlineUser />}
                                />
                            </div>

                            <div className="mt-2 flex flex-col gap-1 justify-center w-full">
                                <Skeleton width="40%" />
                                <Skeleton width="60%" />
                            </div>
                        </div>

                        <BsThreeDotsVertical className="text-xl" />
                    </div>
                </Card>
                <Card className="rounded-none">
                    <div className="w-full flex items-center justify-between">
                        <div className="w-full flex gap-4 items-center">
                            <div>
                                <Avatar
                                    size="lg"
                                    shape="circle"
                                    icon={<HiOutlineUser />}
                                />
                            </div>

                            <div className="mt-2 flex flex-col gap-1 justify-center w-full">
                                <Skeleton width="40%" />
                                <Skeleton width="60%" />
                            </div>
                        </div>

                        <BsThreeDotsVertical className="text-xl" />
                    </div>
                </Card>
            </div>
        </div>
    );
};
export default GettingData;
