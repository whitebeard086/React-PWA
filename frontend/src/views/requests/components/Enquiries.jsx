import { EllipsisButton, TextEllipsis } from "components/shared"
import { Avatar, Card, Dropdown } from "components/ui"
import appConfig from "configs/app.config"
import { BsThreeDotsVertical } from "react-icons/bs"
import { HiOutlineUser } from "react-icons/hi"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Enquiries = () => {
    const { imagePath } = appConfig

    const { loading, enquiries } = useSelector((state) => state.requests.data)
    const { profile } = useSelector((state) => state.auth.user)

    return (
        <div className="mt-4 mb-4">
                        {enquiries?.length < 1 ? (
                            <div className="min-h-[20vh] flex flex-col justify-center">
                                <p className="text-center text-gray-400 font-bold text-2xl">
                                    No enquiries, <br /> check back later...
                                </p>
                            </div>
                        ):(
                            <div>
                                {enquiries?.map((enquiry) => {
                                    const receiver = profile?.id === enquiry?.receiver?.id ? enquiry?.user : enquiry?.receiver
                                    
                                    return (
                                        <Link key={enquiry.id} to={`/chat/${receiver?.slug}`} state={{ chat: enquiry.id }}>
                                            <Card className="rounded-none">
                                                <div className="w-full flex items-center justify-between">
                                                    <div className="w-full flex gap-4 items-center">
                                                        <div>
                                                            <Avatar 
                                                                size="lg"
                                                                shape="circle"
                                                                src={`${imagePath}/${receiver.service?.banner || receiver?.image}`}
                                                                icon={<HiOutlineUser />}
                                                            />
                                                        </div>

                                                        <div className="mt-2 flex flex-col gap-1 justify-center w-full">
                                                            <h4 className="text-base">{receiver.service?.title || receiver.username}</h4>
                                                            <p className="text-gray-4b00 font-semibold">
                                                                <TextEllipsis
                                                                    text={enquiry.messages[enquiry.messages?.length - 1]?.message?.replace(
                                                                        /<[^>]*>?/gm,
                                                                        ""
                                                                    )}
                                                                    maxTextCount={60}
                                                                />
                                                                {/* {enquiry.messages[enquiry.messages?.length - 1]?.message} */}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <Dropdown customToggleClass="flex" placement="top-end" renderTitle={<EllipsisButton icon={<BsThreeDotsVertical className="text-xl text-gray-600" />} variant="twoTone" shape="round" />}>

                                                    </Dropdown>
                                                </div>
                                            </Card>
                                        </Link>
                                    )
                                })}
                            </div>
                        )}
                    </div>
    )
}
export default Enquiries