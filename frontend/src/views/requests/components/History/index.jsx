import { Loading } from "@/components/shared"
import { Avatar, Card } from "@/components/ui"
import appConfig from "@/configs/app.config"
import dayjs from "dayjs"
import { HiOutlineUser } from "react-icons/hi"
import { useSelector } from "react-redux"

const History = () => {
    const { imagePath } = appConfig

    const { history, loading } = useSelector((state) => state.requests.data)
    const { userType } = useSelector((state) => state.auth.user)

    return (
        <div className="mt-2 p-4">
            <h4 className="mb-4">Booking History</h4>

            {loading ? (
                <div className="h-screen grid place-content-center">
                    <Loading loading={true} />
                </div>
            ) : history?.length < 1 ? (
                    <div className="min-h-[60vh] flex justify-center items-center">
                        <p className="text-3xl font-bold text-gray-400">You do not have any <br /> booking history yet</p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {history?.map((item) => (
                            <Card key={item.id}>
                                <div className="flex items-center gap-4 justify-between">
                                    <div className="flex items-center gap-2">
                                        <Avatar 
                                            size="md"
                                            shape="circle"
                                            icon={<HiOutlineUser />}
                                            src={userType === 'Client' ? `${imagePath}/${item.service?.banner}` : userType === 'Provider' ? `${imagePath}/${item.user?.image}` : null}
                                        />
                                        <h4 className="text-lg font-bold text-gray-700">
                                            {userType === 'Client' && item.service?.title}
                                            {userType === 'Provider' && `${item.user?.first_name} ${item.user?.last_name}`}
                                        </h4>
                                    </div>
            
                                    {userType === 'Provider' && (
                                        <p className="text-lg font-semibold text-green-500">
                                            +₦{item.invoice?.price?.toLocaleString()}
                                        </p>
                                    )}
                                    {userType === 'Client' && (item.status === 'completed' || item.status === 'ongoing' || item.status === 'pending') && (
                                        <p className="text-lg font-semibold text-red-500">
                                            -₦{item.invoice?.price?.toLocaleString()}
                                        </p>
                                    )}
                                    {userType === 'Client' && item.status === 'cancelled' && (
                                        <p className="text-lg font-semibold text-green-500">
                                            +₦{item.invoice?.price?.toLocaleString()}
                                        </p>
                                    )}
                                </div>
            
                                <div className="mt-2 flex items-center gap-4 justify-between">
                                    {item.status === 'completed' && (
                                        <p className="font-semibold text-green-500">
                                            {item.status}
                                        </p>
                                    )}
                                    {item.status === 'cancelled' && (
                                        <p className="font-semibold text-red-500">
                                            {item.status}
                                        </p>
                                    )}
                                    {item.status === 'ongoing' && (
                                        <p className="font-semibold text-blue-500">
                                            {item.status}
                                        </p>
                                    )}
                                    {item.status === 'refunded' && (
                                        <p className="font-semibold text-orange-500">
                                            {item.status}
                                        </p>
                                    )}
                                    <p className="font-semibold">
                                        {dayjs(item.created_at).format(
                                            "DD MMM YYYY hh:mm a"
                                        )}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
        </div>
    )
}
export default History