import { Card, Skeleton, Table } from "@/components/ui"
import TableRowSkeleton from "@/components/shared/loaders/TableRowSkeleton"

const GettingData = () => {
    const { Tr, Th, THead } = Table
    
    return (
        <div>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                <Card className="bg-emerald-500">
                    <div className="w-full flex items-center gap-4 justify-between">
                        <div className="flex flex-col gap-4">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-2 w-28" />
                       </div>

                        <Skeleton 
                            variant="circle"
                        />
                    </div>
                </Card>
                <Card className="bg-emerald-500">
                    <div className="w-full flex items-center gap-4 justify-between">
                        <div className="flex flex-col gap-4">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-2 w-28" />
                        </div>

                        <Skeleton 
                            variant="circle"
                        />
                    </div>
                </Card>
                <Card className="bg-emerald-500">
                    <div className="w-full flex items-center gap-4 justify-between">
                        <div className="flex flex-col gap-4">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-2 w-28" />
                        </div>

                        <Skeleton 
                            variant="circle"
                        />
                    </div>
                </Card>
                <Card className="bg-emerald-500">
                    <div className="w-full flex items-center gap-4 justify-between">
                        <div className="flex flex-col gap-4">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-2 w-28" />
                        </div>

                        <Skeleton 
                            variant="circle"
                        />
                    </div>
                </Card>
            </div>

            <div className="mt-4">
                <Card>
                    <h4 className="text-base">Recent Disputes</h4>
                    <Table>
                        <THead>
                            <Tr>
                                <Th className="!text-gray-800">Client</Th>
                                <Th className="!text-gray-800">Provider</Th>
                                <Th className="!text-gray-800">Category</Th>
                                <Th className="!text-gray-800">Service ID</Th>
                                <Th className="!text-gray-800">Service Cost</Th>
                                <Th className="!text-gray-800">Time Started</Th>
                                <Th className="!text-gray-800">Actions</Th>
                            </Tr>
                        </THead>
                        <TableRowSkeleton 
                            columns={7}
                            rows={5}
                        />
                    </Table>
                </Card>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-3 lg:grid-cols-2">
                <Card>
                    <div className="flex items-center gap-4 justify-between">
                        <h4 className="text-base">Recent Providers</h4>
                        <p className="text-sm text-blue-500 hover:text-blue-600 transition duration-300 underline cursor-pointer">
                            View All
                        </p>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                        <div className="w-full flex items-center gap-4">
                            <div className="w-fit">
                                <Skeleton 
                                        variant="circle"
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <Skeleton width="30%" />
                                <Skeleton width="10%" />
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-4">
                            <div className="w-fit">
                                <Skeleton 
                                        variant="circle"
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <Skeleton width="30%" />
                                <Skeleton width="10%" />
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-4">
                            <div className="w-fit">
                                <Skeleton 
                                        variant="circle"
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <Skeleton width="30%" />
                                <Skeleton width="10%" />
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-4">
                            <div className="w-fit">
                                <Skeleton 
                                        variant="circle"
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <Skeleton width="30%" />
                                <Skeleton width="10%" />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-4 justify-between">
                        <h4 className="text-base">Recent Customers</h4>
                        <p className="text-sm text-blue-500 hover:text-blue-600 transition duration-300 underline cursor-pointer">
                            View All
                        </p>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                        <div className="w-full flex items-center gap-4">
                            <div className="w-fit">
                                <Skeleton 
                                        variant="circle"
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <div className="w-full flex items-center gap-4">
                                    <Skeleton width="25%" />
                                    <Skeleton width="20%" />
                                </div>
                                <Skeleton width="60%" />
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-4">
                            <div className="w-fit">
                                <Skeleton 
                                        variant="circle"
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <div className="w-full flex items-center gap-4">
                                    <Skeleton width="25%" />
                                    <Skeleton width="20%" />
                                </div>
                                <Skeleton width="60%" />
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-4">
                            <div className="w-fit">
                                <Skeleton 
                                        variant="circle"
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <div className="w-full flex items-center gap-4">
                                    <Skeleton width="25%" />
                                    <Skeleton width="20%" />
                                </div>
                                <Skeleton width="60%" />
                            </div>
                        </div>
                        <div className="w-full flex items-center gap-4">
                            <div className="w-fit">
                                <Skeleton 
                                        variant="circle"
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <div className="w-full flex items-center gap-4">
                                    <Skeleton width="25%" />
                                    <Skeleton width="20%" />
                                </div>
                                <Skeleton width="60%" />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-4 justify-between">
                        <h4 className="text-base">Recent Bookings</h4>
                        <p className="text-sm text-blue-500 hover:text-blue-600 transition duration-300 underline cursor-pointer">
                            View All
                        </p>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                        <div className="w-full items-center gap-4 justify-between">
                            <div className="w-full flex items-center gap-4">
                                <div className="w-fit">
                                    <Skeleton 
                                        variant="circle"
                                    />
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <Skeleton width="40%" />
                                    <Skeleton width="24%" />
                                </div>

                                <Skeleton className="w-32 h-8" />
                            </div>
                        </div>
                        <div className="w-full items-center gap-4 justify-between">
                            <div className="w-full flex items-center gap-4">
                                <div className="w-fit">
                                    <Skeleton 
                                        variant="circle"
                                    />
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <Skeleton width="40%" />
                                    <Skeleton width="24%" />
                                </div>

                                <Skeleton className="w-32 h-8" />
                            </div>
                        </div>
                        <div className="w-full items-center gap-4 justify-between">
                            <div className="w-full flex items-center gap-4">
                                <div className="w-fit">
                                    <Skeleton 
                                        variant="circle"
                                    />
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <Skeleton width="40%" />
                                    <Skeleton width="24%" />
                                </div>

                                <Skeleton className="w-32 h-8" />
                            </div>
                        </div>
                        <div className="w-full items-center gap-4 justify-between">
                            <div className="w-full flex items-center gap-4">
                                <div className="w-fit">
                                    <Skeleton 
                                        variant="circle"
                                    />
                                </div>

                                <div className="w-full flex flex-col gap-2">
                                    <Skeleton width="40%" />
                                    <Skeleton width="24%" />
                                </div>

                                <Skeleton className="w-32 h-8" />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
export default GettingData