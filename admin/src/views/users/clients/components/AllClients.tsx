import { Button, Card, Paginate, Table } from "@/components/ui"
import { useAppSelector } from "../../store"
import React, { useState } from "react";


const AllClients = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { Tr, Th, Td, THead, TBody } = Table

    const { allClients } = useAppSelector((state) => state.users.data)

    const TH = React.memo(Th)
    const TD = React.memo(Td)

    const pagesVisited = pageNumber * itemsPerPage;
    const paginationData = allClients?.slice(
        pagesVisited,
        pagesVisited + itemsPerPage
    );

    return (
        <Card>
            <h4 className="text-base mb-4">All Clients</h4>

            <Table>
                <THead>
                    <Tr>
                        <TH className="!text-gray-800">Full Name</TH>
                        <TH className="!text-gray-800">Email</TH>
                        <TH className="!text-gray-800">Account Balance</TH>
                        <TH className="!text-gray-800">Account Verification</TH>
                        <TH className="!text-gray-800">Actions</TH>
                    </Tr>
                </THead>
                {allClients.length < 1 && (
                    <TBody>
                        <Tr>
                            <TH colSpan={5} rowSpan={5} className="min-h-[20vh]">
                                <div className="min-h-[20vh] grid place-content-center">
                                    <p className="text-lg text-gray-400">
                                        No Clients
                                    </p>
                                </div>
                            </TH>
                        </Tr>
                    </TBody>
                )}
                {allClients.length > 0 && paginationData?.map((item) => {
                    return (
                        <TBody key={item.id}>
                            <Tr>
                                <TD>{`${item.first_name} ${item.last_name}` }</TD>
                                {item.phone && (
                                    <TD>
                                        +{item.phone}
                                    </TD>
                                )}
                                <TD>₦{item.balance?.toLocaleString()}</TD>
                                <TD className="text-red-500">
                                    Unverified
                                </TD>
                                <TD className="flex items-center gap-2">
                                    <Button
                                        variant="solid"
                                        size="xs"
                                        color="slate-900"
                                    >
                                        View Profile
                                    </Button>
                                    <Button
                                        variant="solid"
                                        size="xs"
                                        color="red-600"
                                    >
                                        Bookings({item.bookings?.length})
                                    </Button>
                                    <Button
                                        variant="solid"
                                        size="xs"
                                    >
                                        Transactions
                                    </Button>
                                </TD>
                            </Tr>
                        </TBody>
                    )
                })}
            </Table>
            <Paginate
                data={allClients}
                itemsPerPage={itemsPerPage}
                setPageNumber={setPageNumber}
                setItemsPerPage={setItemsPerPage}
                // customPageSizes={[20, 30, 40, 50]}
            />
        </Card>
    )
}
export default AllClients