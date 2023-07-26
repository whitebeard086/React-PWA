import classNames from "classnames"
import { Card } from "components/ui"
import { formatTime } from "components/ui/utils/formatTime"
import { BsDashLg } from "react-icons/bs"
import ReactQuill from "react-quill"
import { useSelector } from "react-redux"

const ServiceCard = () => {
    const { profile } = useSelector((state) => state.auth.user)

    const workday = profile.service?.workdays

    return (
        <Card className="mt-14">
            <div className="flex flex-col gap-4">
                <h4 className="py-1 px-3 font-semibold text-base rounded-md text-white bg-blue-500 w-fit">
                    {profile.service?.category?.name}
                </h4>


                <div>
                    <h4 className="font-bold text-base mb-2">
                        About
                    </h4>

                    <ReactQuill
                        value={profile.service?.description}
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
                                <p className={classNames(workday?.monday_start === "Not Available" && "text-red-500", "text-base font-semibold")}>
                                    {formatTime(workday?.monday_start)}
                                </p>
                                {workday?.monday_start !== "Not Available" && (
                                    <>
                                        <BsDashLg className="text-lg text-gray-500" />
                                        <p className="text-base  font-semibold">
                                            {formatTime(workday?.monday_end)}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <h4 className="text-blue-500 text-base font-semibold">Tuesday</h4>
                            <div className="flex items-center gap-2">
                                <p className={classNames(workday?.tuesday_start === "Not Available" && "text-red-500", "text-base font-semibold")}>
                                    {formatTime(workday?.tuesday_start)}
                                </p>
                                {workday?.tuesday_start !== "Not Available" && (
                                    <>
                                        <BsDashLg className="text-lg text-gray-500" />
                                        <p className="text-base  font-semibold">
                                            {formatTime(workday?.tuesday_end)}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <h4 className="text-blue-500 text-base font-semibold">Wednesday</h4>
                            <div className="flex items-center gap-2">
                                <p className={classNames(workday?.wednesday_start === "Not Available" && "text-red-500", "text-base font-semibold")}>
                                    {formatTime(workday?.wednesday_start)}
                                </p>
                                {workday?.wednesday_start !== "Not Available" && (
                                    <>
                                        <BsDashLg className="text-lg text-gray-500" />
                                        <p className="text-base  font-semibold">
                                            {formatTime(workday?.wednesday_end)}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <h4 className="text-blue-500 text-base font-semibold">Thursday</h4>
                            <div className="flex items-center gap-2">
                                <p className={classNames(workday?.thursday_start === "Not Available" && "text-red-500", "text-base font-semibold")}>
                                    {formatTime(workday?.thursday_start)}
                                </p>
                                {workday?.thursday_start !== "Not Available" && (
                                    <>
                                        <BsDashLg className="text-lg text-gray-500" />
                                        <p className="text-base  font-semibold">
                                            {formatTime(workday?.thursday_end)}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <h4 className="text-blue-500 text-base font-semibold">Friday</h4>
                            <div className="flex items-center gap-2">
                                <p className={classNames(workday?.friday_start === "Not Available" && "text-red-500", "text-base font-semibold")}>
                                    {formatTime(workday?.friday_start)}
                                </p>
                                {workday?.friday_start !== "Not Available" && (
                                    <>
                                        <BsDashLg className="text-lg text-gray-500" />
                                        <p className="text-base  font-semibold">
                                            {formatTime(workday?.friday_end)}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <h4 className="text-blue-500 text-base font-semibold">Saturday</h4>
                            <div className="flex items-center gap-2">
                                <p className={classNames(workday?.saturday_start === "Not Available" && "text-red-500", "text-base font-semibold")}>
                                    {formatTime(workday?.saturday_start)}
                                </p>
                                {workday?.saturday_start !== "Not Available" && (
                                    <>
                                        <BsDashLg className="text-lg text-gray-500" />
                                        <p className="text-base  font-semibold">
                                            {formatTime(workday?.saturday_end)}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <h4 className="text-blue-500 text-base font-semibold">Sunday</h4>
                            <div className="flex items-center gap-2">
                                <p className={classNames(workday?.sunday_start === "Not Available" && "text-red-500", "text-base font-semibold")}>
                                    {formatTime(workday?.sunday_start)}
                                </p>
                                {workday?.sunday_start !== "Not Available" && (
                                    <>
                                        <BsDashLg className="text-lg text-gray-500" />
                                        <p className="text-base  font-semibold">
                                            {formatTime(workday?.sunday_end)}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
export default ServiceCard