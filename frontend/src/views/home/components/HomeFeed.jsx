import { Avatar, Card } from "components/ui"
import appConfig from "configs/app.config"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import RecentBookings from "./recentBookings"
import ServicesCard from "./servicesCard"
import BillsComponent from "views/payments/components/Bills/BillsComponent"

const HomeFeed = () => {
    const { imagePath } = appConfig

    const { categories, bookings } = useSelector((state) => state.home.data)

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

            <BillsComponent />
        </div>
    )
}
export default HomeFeed