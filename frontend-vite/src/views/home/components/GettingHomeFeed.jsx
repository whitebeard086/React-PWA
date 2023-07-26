import { Card, Skeleton } from "components/ui"

const GettingHomeFeed = () => {
    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 w-full">
                <div className="grid grid-cols-4 gap-4">
                    <Card bordered bodyClass="p-0" className="p-0">
                        <Skeleton height="100px" />
                    </Card>
                    <Card bordered bodyClass="p-0" className="p-0">
                        <Skeleton height="100px" />
                    </Card>
                    <Card bordered bodyClass="p-0" className="p-0">
                        <Skeleton height="100px" />
                    </Card>
                    <Card bordered bodyClass="p-0" className="p-0">
                        <Skeleton height="100px" />
                    </Card>
                    <Card bordered bodyClass="p-0" className="p-0">
                        <Skeleton height="100px" />
                    </Card>
                    <Card bordered bodyClass="p-0" className="p-0">
                        <Skeleton height="100px" />
                    </Card>
                    <Card bordered bodyClass="p-0" className="p-0">
                        <Skeleton height="100px" />
                    </Card>
                    <Card bordered bodyClass="p-0" className="p-0">
                        <Skeleton height="100px" />
                    </Card>
                </div>
            </div>

            <div className="col-span-4 w-full mt-4">
                <h4 className="text-lg font-bold mb-2">Recently Ordered Services</h4>
                <div className="flex overflow-auto gap-4 w-full pb-2">
                    <Card bodyClass="w-full flex items-center gap-4" className="min-w-[20rem] bg-primary-500">
                        <Card bordered bodyClass="p-0" className="p-0 w-1/2">
                            <Skeleton height="150px" width="100%" />
                        </Card>

                        <div className="w-1/2 flex flex-col gap-4">
                            <div className="flex flex-col gap-2 w-full">
                                <Skeleton height="22px" width="60%" />
                                <Skeleton height="16px" width="100%" />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Skeleton height="22px" width="60%" />
                                <Skeleton height="16px" width="100%" />
                            </div>
                        </div>
                    </Card>
                    <Card bodyClass="w-full flex items-center gap-4" className="min-w-[20rem] bg-primary-500">
                        <Card bordered bodyClass="p-0" className="p-0 w-1/2">
                            <Skeleton height="150px" width="100%" />
                        </Card>

                        <div className="w-1/2 flex flex-col gap-4">
                            <div className="flex flex-col gap-2 w-full">
                                <Skeleton height="22px" width="60%" />
                                <Skeleton height="16px" width="100%" />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Skeleton height="22px" width="60%" />
                                <Skeleton height="16px" width="100%" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="col-span-4 w-full mt-4">
                <Card className="bg-black">
                    <div>
                        <h4 className="text-lg font-bold mb-2 text-white">Bill Payments</h4>

                        <div className="grid grid-cols-4 gap-4">
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                            <Card bordered bodyClass="p-0" className="p-0">
                                <Skeleton height="60px" />
                            </Card>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
export default GettingHomeFeed