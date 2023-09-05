import { TextEllipsis } from "@/components/shared";
import { Avatar, Card } from "@/components/ui";
import appConfig from "@/configs/app.config";
import dayjs from "dayjs";
import { HiOutlineUser } from "react-icons/hi";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

const Disputes = () => {
    const { disputes } = useSelector((state) => state.requests.data)
    const { profile, userType } = useSelector((state) => state.auth.user);

    return (
        <div className="mt-4 mb-4">
            {disputes?.map((item) => {
                return (
                    <Link key={item.id} to={`requests/disputes/${item.id}`}>
                        <Card className='rounded-none'>
                            <div className="w-full flex items-center justify-between">
                                <div className="w-full flex gap-4 items-center">
                                    <div>
                                        {userType === 'Client' ? (
                                            <Avatar
                                                size="lg"
                                                shape="circle"
                                                src={`${appConfig?.imagePath}/${
                                                    item.booking.service.banner
                                                }`}
                                                icon={<HiOutlineUser />}
                                            />
                                        ):(
                                            <Avatar
                                                size="lg"
                                                shape="circle"
                                                src={`${appConfig?.imagePath}/${
                                                    item.booking.user.image
                                                }`}
                                                icon={<HiOutlineUser />}
                                            />
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4 justify-between w-full">
                                        <div className="mt-2 flex flex-col justify-center w-full">
                                            <h4 className="text-base">
                                                {userType === 'Client' ? (
                                                    item.booking.service.title
                                                ):(
                                                    `${item.booking.user.first_name} ${item.booking.user.last_name}`
                                                )}
                                            </h4>
                                            <p className="text-gray-500 font-semibold">
                                                <TextEllipsis
                                                    text={item.description}
                                                    maxTextCount={60}
                                                />
                                            </p>
                                            <p className="text-xs heading-text font-bold">
                                                {dayjs(item.created_at).format('DD MMM, YYYY - h:mm A')}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Link>
                )
            })}
        </div>
    )
}
export default Disputes