import { Card } from "@/components/ui"
import { BiCameraMovie, BiUserVoice } from "react-icons/bi"
import { MdMobiledataOff, MdOutlineElectricalServices, MdOutlineFlightTakeoff, MdOutlineGames, MdOutlineHotel, MdOutlineSignalCellularConnectedNoInternet0Bar } from "react-icons/md"

const BillsComponent = () => {
    return (
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
    )
}
export default BillsComponent