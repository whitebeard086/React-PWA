import { Avatar, Button, Card, Image } from "components/ui"
import appConfig from "configs/app.config"
import { AiFillStar } from "react-icons/ai"
import { BiCameraMovie, BiUserVoice } from "react-icons/bi"
import { MdMobiledataOff, MdOutlineElectricalServices, MdOutlineFlightTakeoff, MdOutlineGames, MdOutlineHotel, MdOutlineSignalCellularConnectedNoInternet0Bar } from "react-icons/md"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import RecentBookings from "./recentBookings"
import ServicesCard from "./servicesCard"

const HomeFeed = () => {
    const { imagePath } = appConfig

    const { loading, categories, services, bookings } = useSelector((state) => state.home.data)

    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 w-full">
                <div className="grid grid-cols-4 gap-4">
                    {categories?.map((item) => (
                        <Link key={item.id} to={`/browse/${item.slug}`}>
                            <Card clickable bordered bodyClass="" className="bg-amber-50">
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
                        </Link>
                    ))}

                </div>
                <div className="flex w-full justify-end">
                    <p className="font-bold text-emerald-500 hover:text-emerald-600 transition duration-300 cursor-pointer text-base text-end mr-1">more</p>
                </div>
            </div>

            {bookings?.length > 0 ? (
                <div className="col-span-4 w-full mt-4">
                    <RecentBookings />
                </div>
            ) : (
                <div className="col-span-4 w-full mt-4">
                    <ServicesCard />
                </div>
            )}

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