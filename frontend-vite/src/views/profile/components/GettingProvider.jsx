import { Card, Skeleton } from "components/ui"

const GettingProvider = () => {
    return (
        <div>
            <div className="relative">
                <Card bordered bodyClass="p-0">
                    <Skeleton height="14rem" />
                </Card>

                <div className="absolute w-full -bottom-10">
                    <Card bordered className="bg-black w-[80%] mx-auto">
                        <div className="flex items-center justify-between">
                            <Skeleton height="25px" width="30%" />
                            <Skeleton height="20px" width="20%" />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <Skeleton height="15px" width="30%" />
                            <Skeleton height="15px" width="20%" />
                        </div>
                    </Card>
                </div>
            </div>

            <Card className="mt-14">
                <div className="flex flex-col gap-4">
                    <Card bodyClass="p-3" className="bg-blue-500 w-[40%]">
                        <Skeleton height="18px" width="100%" />
                    </Card>
                    <div>
                        <h4 className="font-bold text-base mb-2">
                            About
                        </h4>

                        <div className="flex flex-col gap-1">
                            <Skeleton height="12px" width="97%" />
                            <Skeleton height="12px" width="100%" />
                            <Skeleton height="12px" width="100%" />
                            <Skeleton height="12px" width="75%" />
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-base mb-2">
                            Working Hours
                        </h4>

                        <div className="flex flex-col gap-1">
                            <Skeleton height="12px" width="100%" />
                            <Skeleton height="12px" width="100%" />
                            <Skeleton height="12px" width="100%" />
                            <Skeleton height="12px" width="100%" />
                        </div>
                    </div>

                </div>
            </Card>

            <Card className="bg-primary-500 mt-4">

            </Card>
        </div>
    )
}
export default GettingProvider