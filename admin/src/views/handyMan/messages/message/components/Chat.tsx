import { Avatar, Card, Tooltip } from "@/components/ui"
import { ChatWithMessages } from "../../store"
import classNames from "classnames"
import { HiOutlineUser } from "react-icons/hi"
import { AiOutlineWechat } from "react-icons/ai"
import appConfig from "@/configs/app.config"
import { RichTextEditor } from "@/components/shared"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

interface Props {
    className?: string
    data: Partial<ChatWithMessages>
}

const Chat = ({ className, data }: Props) => {
    const client = data.user?.service ? data.receiver : data.user
    const provider = data.user?.service ? data.user : data.receiver
    // console.log(client, provider);
    return (
        <div className={classNames(className)}>
            <Card className="mb-4">
                <div className="flex items-center gap-2">
                    <Avatar 
                        shape="circle"
                        size={"lg"}
                        icon={<AiOutlineWechat />}
                        className="bg-emerald-500"
                    />
                    <h4 className="text-base">Enquiry Chat</h4>
                </div>
            </Card>
            {data.messages && data.messages?.length < 1 && (
                <div className="w-full min-h-[70vh] grid place-content-center">
                    <p className="text-lg lg:text-xl font-bold text-gray-400 text-center">
                        No messages here yet...
                    </p>
                </div>
            )}
            {data.messages?.map((msg) => {
                return (
                    <div key={msg.id}>
                        {msg.sender_id === client?.id ? (
                            <div className="flex flex-col mb-4 pr-12">
                                <div className="flex gap-2">
                                    <Tooltip title={`${client?.first_name} ${client?.last_name}`}>
                                        <Link to={`/users/clients/${client?.username}`}>
                                            <Avatar 
                                                shape="circle"
                                                className="shadow-md"
                                                icon={<HiOutlineUser />}
                                                src={`${appConfig.imagePath}/${client?.image}`}
                                            />
                                        </Link>
                                    </Tooltip>
                                    <div className="w-full flex flex-col items-start">
                                        <Card className="h-fit mb-1 min-w-[52%]" bodyClass="h-fit">
                                            <RichTextEditor readOnly className="text-sm h-fit" theme="bubble" value={msg?.message || undefined} />
                                        </Card>
                                        <p className="text-left text-xs">
                                            {dayjs(msg.created_at).format('DD MMM, YYYY - h:mm A')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <div className="flex flex-col mb-4 justify-end w-full pl-12">
                                <div className="flex gap-2">
                                    <div className="w-full flex justify-end flex-col items-end">
                                        <Card className="h-fit mb-1 bg-emerald-500 text-white min-w-[52%]" bodyClass="h-fit">
                                            <RichTextEditor readOnly className="text-sm h-fit" theme="bubble" value={msg?.message || undefined} />
                                        </Card>
                                        <p className="text-left text-xs">
                                            {dayjs(msg.created_at).format('DD MMM, YYYY - h:mm A')}
                                        </p>
                                    </div>
                                    <Tooltip title={provider?.service?.title}>
                                        <Link to={`/services/${provider?.service?.uid}`}>
                                            <Avatar 
                                                shape="circle"
                                                className="shadow-md"
                                                icon={<HiOutlineUser />}
                                                src={`${appConfig.imagePath}/${provider?.service?.banner}`}
                                            />
                                        </Link>
                                    </Tooltip>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
export default Chat