import { Avatar, Card } from "components/ui"
import { HiOutlineUser } from "react-icons/hi"
import { Link } from "react-router-dom"

const UnansweredChats = ({ data, imagePath }) => {
    const chats = data?.filter((item) => item.messages?.length > 0)
    return (
        <>
            {chats?.length < 1 ? (
                <div className="min-h-[20vh] w-full flex flex-col justify-center">
                    <p className="text-center text-gray-400 font-bold text-2xl">
                        You don't have <br /> any unanswered chats...
                    </p>
                </div>
            ): (
                <>
                    {chats?.map((item) => (
                        <Link key={item.id} to={`/chat/${item.user?.slug}`} state={{ chat: item.id }}>
                            <Card className="min-w-[10rem] w-40" bodyClass="flex w-full flex-col justify-center items-center">
                                <Avatar 
                                    size="lg"
                                    shape="circle"
                                    icon={<HiOutlineUser />}
                                    src={item.user?.image ? `${imagePath}/${item.user?.image}` : null}
                                />

                                <h4 className="font-semibold text-base">
                                    {`${item?.user?.first_name} ${item?.user?.last_name}`}
                                </h4>
                            </Card>
                        </Link>
                    ))}
                </>
            )}   
        </>
    )
}
export default UnansweredChats