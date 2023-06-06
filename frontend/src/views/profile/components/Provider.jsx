import classNames from "classnames"
import { Button, Card, Image } from "components/ui"
import { formatTime } from "components/ui/utils/formatTime"
import appConfig from "configs/app.config"
import millify from "millify"
import { AiFillStar, AiFillWechat } from "react-icons/ai"
import { BsDashLg } from "react-icons/bs"
import ReactQuill from "react-quill"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Provider = () => {
    const { imagePath } = appConfig;
    const navigate = useNavigate();

    const { provider, service, workdays } = useSelector((state) => state.profile.data)

    return (
        <div>
            <div className="relative">
                <Card bordered bodyClass="p-0 h-56">
                    <Image
                        src={`${imagePath}/${service.banner}`}
                        alt={service.title}
                        className="h-full w-full object-fit rounded-lg"
                    >

                    </Image>
                </Card>

                <div className="absolute w-full -bottom-10">
                    <Card bordered className="bg-black w-[80%] mx-auto">
                        <div className="flex items-center gap-4 justify-between">
                            <h4 className="text-white font-bold text-lg">
                                {service?.title}
                            </h4>
                            <h5 className="text-primary-500 text-lg font-bold">
                                ₦{service?.starting_price?.toLocaleString()}+
                            </h5>
                        </div>

                        <div className="flex items-center gap-4 justify-between mt-2">
                            <div className="flex items-center gap-2">
                                <div className="flex items center">
                                    <AiFillStar className="text-amber-200 text-md" />
                                    <AiFillStar className="text-amber-200 text-md" />
                                    <AiFillStar className="text-amber-200 text-md" />
                                    <AiFillStar className="text-amber-200 text-md" />
                                    <AiFillStar className="text-amber-200 text-md" />
                                </div>
                                <p className="text-gray-300 font-semibold">5 stars</p>
                            </div>

                            <p className="text-gray-300 font-semibold">{millify(2300)} Orders</p>
                        </div>
                    </Card>
                </div>
            </div>

            <Card className="mt-14">
                <div className="flex flex-col gap-4">
                    <h4 className="py-1 px-3 font-semibold text-base rounded-md text-white bg-blue-500 w-fit">
                        {service?.category?.name}
                    </h4>

                    <div>
                        <h4 className="font-bold text-base mb-2">
                            About
                        </h4>

                        <ReactQuill
                            value={service?.description}
                            readOnly={true}
                            theme="bubble"
                            className="p-0 "
                            style={{
                                marginRight: "",
                                marginLeft: "",
                                marginBottom: '-2rem',
                            }}
                        />
                    </div>

                    <div>
                        <h4 className="font-bold text-base mb-2">
                            Working Hours
                        </h4>

                        <div>
                            <div className="flex items-center justify-between">
                                <h4 className="text-blue-500 text-base font-semibold">Monday</h4>
                                <div className="flex items-center gap-2">
                                    <p className={classNames(workdays?.monday_start === "Not Available" && "text-red-500", "text-base font-semibold")}>
                                        {formatTime(workdays?.monday_start)}
                                    </p>
                                    {workdays?.monday_start !== "Not Available" && (
                                        <>
                                            <BsDashLg className="text-lg text-gray-500" />
                                            <p className="text-base  font-semibold">
                                                {formatTime(workdays?.monday_end)}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <h4 className="text-blue-500 text-base font-semibold">Tuesday</h4>
                                <div className="flex items-center gap-2">
                                    <p className={classNames(workdays?.tuesday_start === "Not Available" && "text-red-500", "text-base font-semibold")}>
                                        {formatTime(workdays?.tuesday_start)}
                                    </p>
                                    {workdays?.tuesday_start !== "Not Available" && (
                                        <>
                                            <BsDashLg className="text-lg text-gray-500" />
                                            <p className="text-base  font-semibold">
                                                {formatTime(workdays?.tuesday_end)}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <h4 className="text-blue-500 text-base font-semibold">Wednesday</h4>
                                <div className="flex items-center gap-2">
                                    <p className={classNames(workdays?.wednesday_start === "Not Available" && "text-red-500", "text-base font-semibold")}>
                                        {formatTime(workdays?.wednesday_start)}
                                    </p>
                                    {workdays?.wednesday_start !== "Not Available" && (
                                        <>
                                            <BsDashLg className="text-lg text-gray-500" />
                                            <p className="text-base  font-semibold">
                                                {formatTime(workdays?.wednesday_end)}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <h4 className="text-blue-500 text-base font-semibold">Thursday</h4>
                                <div className="flex items-center gap-2">
                                    <p className={classNames(workdays?.thursday_start === "Not Available" && "text-red-500", "text-base font-semibold")}>
                                        {formatTime(workdays?.thursday_start)}
                                    </p>
                                    {workdays?.thursday_start !== "Not Available" && (
                                        <>
                                            <BsDashLg className="text-lg text-gray-500" />
                                            <p className="text-base  font-semibold">
                                                {formatTime(workdays?.thursday_end)}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <h4 className="text-blue-500 text-base font-semibold">Friday</h4>
                                <div className="flex items-center gap-2">
                                    <p className={classNames(workdays?.friday_start === "Not Available" && "text-red-500", "text-base font-semibold")}>
                                        {formatTime(workdays?.friday_start)}
                                    </p>
                                    {workdays?.friday_start !== "Not Available" && (
                                        <>
                                            <BsDashLg className="text-lg text-gray-500" />
                                            <p className="text-base  font-semibold">
                                                {formatTime(workdays?.friday_end)}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <h4 className="text-blue-500 text-base font-semibold">Saturday</h4>
                                <div className="flex items-center gap-2">
                                    <p className={classNames(workdays?.saturday_start === "Not Available" && "text-red-500", "text-base font-semibold")}>
                                        {formatTime(workdays?.saturday_start)}
                                    </p>
                                    {workdays?.saturday_start !== "Not Available" && (
                                        <>
                                            <BsDashLg className="text-lg text-gray-500" />
                                            <p className="text-base  font-semibold">
                                                {formatTime(workdays?.saturday_end)}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <h4 className="text-blue-500 text-base font-semibold">Sunday</h4>
                                <div className="flex items-center gap-2">
                                    <p className={classNames(workdays?.sunday_start === "Not Available" && "text-red-500", "text-base font-semibold")}>
                                        {formatTime(workdays?.sunday_start)}
                                    </p>
                                    {workdays?.sunday_start !== "Not Available" && (
                                        <>
                                            <BsDashLg className="text-lg text-gray-500" />
                                            <p className="text-base  font-semibold">
                                                {formatTime(workdays?.sunday_end)}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Card>

            <div className="mt-4">
                <Button
                    variant="solid"
                    block
                    icon={<AiFillWechat />}
                    // onClick={() => navigate('/service/edit')}
                >
                    Chat Now
                </Button>
            </div>
        </div>
    )
}
export default Provider