import { Avatar, Card } from "@/components/ui"
import { ChatWithMessages } from "../../store"
import classNames from "classnames"
import { HiOutlineUser } from "react-icons/hi"
import appConfig from "@/configs/app.config"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

interface Props {
    className?: string
    data: Partial<ChatWithMessages>
}

const Details = ({ className, data }: Props) => {
    const client = data.user?.service ? data.receiver : data.user
    const provider = data.user?.service ? data.user : data.receiver

    return (
        <Card className={classNames(className)}>
            <h4 className="text-base mb-8">Chat Details</h4>

            <div className="mb-4">
                <p className="text-base mb-4 font-semibold">Client</p>
                <Link to={`/users/clients/${client?.username}`} className="flex items-center gap-2 w-fit">
                    <Avatar 
                        shape="circle"
                        className="shadow-md"
                        icon={<HiOutlineUser />}
                        src={`${appConfig.imagePath}/${client?.image}`}
                    />
                    <div  className="">
                        <h4 className="text-sm hover:text-emerald-500 transition duration-200">
                            {`${client?.first_name} ${client?.last_name}`}
                        </h4>
                    </div>
                </Link>
            </div>

            <div className="mb-4">
                <p className="text-base mb-4 font-semibold">Provider</p>
                <Link to={`/services/${provider?.service?.uid}`} className="flex items-center gap-2 w-fit">
                    <Avatar 
                        shape="circle"
                        className="shadow-md"
                        icon={<HiOutlineUser />}
                        src={`${appConfig.imagePath}/${provider?.service?.banner}`}
                    />
                    <div  className="">
                        <h4 className="text-sm hover:text-emerald-500 transition duration-200">
                            {provider?.service?.title}
                        </h4>
                    </div>
                </Link>
            </div>

            <p className="text-base mb-4 font-semibold">Messages({data.messages_count?.toLocaleString()})</p>

            <div className="mb-4">
                <p className="text-base mb-4 font-semibold">Invoices({data.invoices?.length?.toLocaleString()})</p>
                <div className="flex flex-col gap-2">
                    {data.invoices?.map((item) => (
                        <div key={item.id}>
                            <div className="flex items-center gap-4 justify-between">
                                <h4 className="text-sm">
                                    {item.invoice_number}
                                </h4>
                                <p className={classNames("text-sm font-bold", item.status === "paid" && "text-green-500", item.status === "cancelled" && "text-red-500", item.status === "pending" && "text-blue-500",)}>
                                    ₦{item.price?.toLocaleString()}
                                </p>
                            </div>
                            <p className={classNames("text-sm font-bold", item.status === "paid" && "text-green-500", item.status === "cancelled" && "text-red-500", item.status === "pending" && "text-blue-500",)}>
                                {item.status}
                            </p>
                            <p className="text-sm">
                                {dayjs(item.created_at).format('DD MMM, YYYY - h:mm A')}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
export default Details