import { Avatar, Button, Card, Image } from "components/ui"
import appConfig from "configs/app.config"
import { AiFillStar } from "react-icons/ai"
import { BiCameraMovie, BiUserVoice } from "react-icons/bi"
import { MdMobiledataOff, MdOutlineElectricalServices, MdOutlineFlightTakeoff, MdOutlineGames, MdOutlineHotel, MdOutlineSignalCellularConnectedNoInternet0Bar } from "react-icons/md"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const HomeFeed = () => {
    const { imagePath } = appConfig

    const { loading, categories, services, bookings } = useSelector((state) => state.home.data)

    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 w-full">
                <div className="grid grid-cols-4 gap-4">
                    {categories?.map((item) => (
                        <Card clickable key={item.id} bordered bodyClass="" className="bg-amber-50">
                            <div className="flex flex-col gap-2 justify-center items-center">
                                <Avatar 
                                    size={45}
                                    shape="circle"
                                    src={`${imagePath}/${item?.icon}`}
                                    className="bg-white border-2"
                                />

                                <p className="text-base font-bold">
                                    {item.name.split(" ")[0]}
                                </p>
                            </div>
                        </Card>
                    ))}

                </div>
                <div className="flex w-full justify-end">
                    <p className="font-bold text-emerald-500 hover:text-emerald-600 transition duration-300 cursor-pointer text-base text-end mr-1">more</p>
                </div>
            </div>

            <div className="col-span-4 w-full mt-4">
                <h4 className="text-lg font-bold mb-2">Recently Ordered Services</h4>

                {bookings?.length < 1 ? (
                    <div className="min-h-[10rem] flex justify-center items-center flex-col gap-1">
                        <p className="text-lg text-gray-400 font-semibold">
                            You have not ordered any services yet
                        </p>
                        <Link to="/browse">
                            <Button
                                size="xs"
                                variant="solid"
                            >
                                Browse Services
                            </Button>
                        </Link>
                    </div>
                ):(
                    <div className="flex overflow-auto gap-4 w-full pb-2">
                        {bookings?.map((item) => (
                            <Link key={item.id}>
                                <Card bodyClass="w-full flex items-center gap-4" className="min-w-[20rem] bg-primary-500">
                                    <Card bordered bodyClass="p-0 h-32" className="p-0 w-1/2">
                                        <Image 
                                            src={`${imagePath}/${item.service?.banner}`}
                                            alt={`${item.service?.title}`}
                                            wrapperClassName="rounded-lg"
                                            className="w-full h-full object-fit rounded-lg"
                                        />
                                    </Card>

                                    <div className="w-1/2 flex flex-col gap-4">
                                        <div className="flex flex-col w-full">
                                            <h4 className="text-base font-bold text-white">
                                                {item.service?.title}
                                            </h4>
                                            <p className="font-semibold text-gray-200">
                                                {item.service?.category?.name}
                                            </p>
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <h4 className="text-base font-bold text-white">
                                                From ₦{item.service?.starting_price?.toLocaleString()}
                                            </h4>

                                            <div className="flex items-center gap-2">
                                                <div className="flex items center">
                                                    <AiFillStar className="text-amber-200 text-md" />
                                                    <AiFillStar className="text-amber-200 text-md" />
                                                    <AiFillStar className="text-amber-200 text-md" />
                                                    <AiFillStar className="text-amber-200 text-md" />
                                                    <AiFillStar className="text-amber-200 text-md" />
                                                </div>
                                                <p className="text-gray-200 font-semibold">5 stars</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <div className="col-span-4 w-full mt-4">
                <Card bordered className="bg-black">
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white">Bill Payments</h4>

                        <div className="grid grid-cols-4 gap-4">
                            <div className="flex cursor-pointer flex-col justify-center items-center">
                                <Card className="flex justify-center items-center">
                                    <BiUserVoice className="text-3xl" />
                                </Card>
                                <p className="text-base font-bold text-gray-200">
                                    Airtime
                                </p>
                            </div>
                            <div className="flex cursor-pointer flex-col justify-center items-center">
                                <Card className="flex justify-center items-center">
                                    <MdMobiledataOff className="text-3xl" />
                                </Card>
                                <p className="text-base font-bold text-gray-200">
                                    Data
                                </p>
                            </div>
                            <div className="flex cursor-pointer flex-col justify-center items-center">
                                <Card className="flex justify-center items-center">
                                    <MdOutlineElectricalServices className="text-3xl" />
                                </Card>
                                <p className="text-base font-bold text-gray-200">
                                    Electricity
                                </p>
                            </div>
                            <div className="flex cursor-pointer flex-col justify-center items-center">
                                <Card className="flex justify-center items-center">
                                    <BiCameraMovie className="text-3xl" />
                                </Card>
                                <p className="text-base font-bold text-gray-200">
                                    Television
                                </p>
                            </div>
                            <div className="flex cursor-pointer flex-col justify-center items-center">
                                <Card className="flex justify-center items-center">
                                    <MdOutlineGames className="text-3xl" />
                                </Card>
                                <p className="text-base font-bold text-gray-200">
                                    Betting
                                </p>
                            </div>
                            <div className="flex cursor-pointer flex-col justify-center items-center">
                                <Card className="flex justify-center items-center">
                                    <MdOutlineSignalCellularConnectedNoInternet0Bar className="text-3xl" />
                                </Card>
                                <p className="text-base font-bold text-gray-200">
                                    Internet
                                </p>
                            </div>
                            <div className="flex cursor-pointer flex-col justify-center items-center">
                                <Card className="flex justify-center items-center">
                                    <MdOutlineHotel className="text-3xl" />
                                </Card>
                                <p className="text-base font-bold text-gray-200">
                                    Hotels
                                </p>
                            </div>
                            <div className="flex cursor-pointer flex-col justify-center items-center">
                                <Card className="flex justify-center items-center">
                                    <MdOutlineFlightTakeoff className="text-3xl" />
                                </Card>
                                <p className="text-base font-bold text-gray-200">
                                    Flights
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
export default HomeFeed