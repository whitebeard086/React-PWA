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
                    <h4 className="text-base">All Clients</h4>
                    <Table>
                        <THead>
                            <Tr>
                                <Th className="!text-gray-800">Full Name</Th>
                                <Th className="!text-gray-800">Email</Th>
                                <Th className="!text-gray-800">Account Balance</Th>
                                <Th className="!text-gray-800">Account Verification</Th>
                                <Th className="!text-gray-800">Actions</Th>
                            </Tr>
                        </THead>
                        <TableRowSkeleton 
                            columns={5}
                            rows={10}
                        />
                    </Table>
                </Card>
            </div>
        </div>
    )
}
export default GettingData