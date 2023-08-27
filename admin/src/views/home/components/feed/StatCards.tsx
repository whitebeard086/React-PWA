import { Card } from "@/components/ui"
import { BiSolidBookAdd } from "react-icons/bi"
import { FaUsers, FaUsersCog } from "react-icons/fa"
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import { useAppSelector } from "../../store"

const StatCards = () => {
    const { allBookings, allClients, allProviders } = useAppSelector((state) => state.home.data) 

    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            <Card className="bg-emerald-500">
                <div className="w-full flex items-center gap-4 justify-between">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-lg text-white">{allBookings?.toLocaleString()}</h4>
                        <h4 className="text-sm text-white font-semibold">Total Bookings</h4>
                    </div>

                    <div className="w-11 h-11 bg-emerald-600/50 rounded-full grid place-content-center">
                        <BiSolidBookAdd className="text-lg text-white" />
                    </div>
                </div>
            </Card>

            <Card className="bg-emerald-500">
                <div className="w-full flex items-center gap-4 justify-between">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-lg text-white">{allClients?.toLocaleString()}</h4>
                        <h4 className="text-sm text-white font-semibold">Total Clients</h4>
                    </div>

                    <div className="w-11 h-11 bg-emerald-600/50 rounded-full grid place-content-center">
                        <FaUsers className="text-lg text-white" />
                    </div>
                </div>
            </Card>

            <Card className="bg-emerald-500">
                <div className="w-full flex items-center gap-4 justify-between">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-lg text-white">{allProviders?.toLocaleString()}</h4>
                        <h4 className="text-sm text-white font-semibold">Total Providers</h4>
                    </div>

                    <div className="w-11 h-11 bg-emerald-600/50 rounded-full grid place-content-center">
                        <FaUsersCog className="text-lg text-white" />
                    </div>
                </div>
            </Card>

            <Card className="bg-emerald-500">
                <div className="w-full flex items-center gap-4 justify-between">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-lg text-white">₦{450000?.toLocaleString()}</h4>
                        <h4 className="text-sm text-white font-semibold">Total Revenue</h4>
                    </div>

                    <div className="w-11 h-11 bg-emerald-600/50 rounded-full grid place-content-center">
                        <RiMoneyDollarCircleFill className="text-lg text-white" />
                    </div>
                </div>
            </Card>
        </div>
    )
}
export default StatCards