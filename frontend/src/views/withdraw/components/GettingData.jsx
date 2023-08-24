import { Card, Skeleton } from "@/components/ui"
import { MdDelete } from "react-icons/md"

const GettingData = () => {
    return (
        <div className="flex flex-col">
            <Card bodyClass="w-full">
                <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-1 w-full">
                        <Skeleton height="20px" width="30%" />
                        <Skeleton height="14px" width="25%" />
                        <Skeleton height="14px" width="35%" />
                    </div>

                    <div className="bg-gray-100 hover:bg-gray-200 transition duration-300 w-10 h-10 grid place-content-center rounded-full cursor-pointer">
                        <MdDelete className="text-2xl text-red-500 hover:text-red-600 transition duration-300" />
                    </div>
                </div>
            </Card>
            <Card bodyClass="w-full">
                <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-1 w-full">
                        <Skeleton height="20px" width="30%" />
                        <Skeleton height="14px" width="25%" />
                        <Skeleton height="14px" width="35%" />
                    </div>

                    <div className="bg-gray-100 hover:bg-gray-200 transition duration-300 w-10 h-10 grid place-content-center rounded-full cursor-pointer">
                        <MdDelete className="text-2xl text-red-500 hover:text-red-600 transition duration-300" />
                    </div>
                </div>
            </Card>
            <Card bodyClass="w-full">
                <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-1 w-full">
                        <Skeleton height="20px" width="30%" />
                        <Skeleton height="14px" width="25%" />
                        <Skeleton height="14px" width="35%" />
                    </div>

                    <div className="bg-gray-100 hover:bg-gray-200 transition duration-300 w-10 h-10 grid place-content-center rounded-full cursor-pointer">
                        <MdDelete className="text-2xl text-red-500 hover:text-red-600 transition duration-300" />
                    </div>
                </div>
            </Card>
            <Card bodyClass="w-full">
                <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-1 w-full">
                        <Skeleton height="20px" width="30%" />
                        <Skeleton height="14px" width="25%" />
                        <Skeleton height="14px" width="35%" />
                    </div>

                    <div className="bg-gray-100 hover:bg-gray-200 transition duration-300 w-10 h-10 grid place-content-center rounded-full cursor-pointer">
                        <MdDelete className="text-2xl text-red-500 hover:text-red-600 transition duration-300" />
                    </div>
                </div>
            </Card>
            <Card bodyClass="w-full">
                <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-1 w-full">
                        <Skeleton height="20px" width="30%" />
                        <Skeleton height="14px" width="25%" />
                        <Skeleton height="14px" width="35%" />
                    </div>

                    <div className="bg-gray-100 hover:bg-gray-200 transition duration-300 w-10 h-10 grid place-content-center rounded-full cursor-pointer">
                        <MdDelete className="text-2xl text-red-500 hover:text-red-600 transition duration-300" />
                    </div>
                </div>
            </Card>
            <Card bodyClass="w-full">
                <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-1 w-full">
                        <Skeleton height="20px" width="30%" />
                        <Skeleton height="14px" width="25%" />
                        <Skeleton height="14px" width="35%" />
                    </div>

                    <div className="bg-gray-100 hover:bg-gray-200 transition duration-300 w-10 h-10 grid place-content-center rounded-full cursor-pointer">
                        <MdDelete className="text-2xl text-red-500 hover:text-red-600 transition duration-300" />
                    </div>
                </div>
            </Card>
        </div>
    )
}
export default GettingData