import { Button, Card, Paginate, Table } from "@/components/ui"
import { useAppSelector } from "../../store"
import { useState } from "react";

const AllProviders = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { Tr, Th, Td, THead, TBody } = Table
    const {  allProviders } = useAppSelector((state) => state.users.data)

    const pagesVisited = pageNumber * itemsPerPage;
    const paginationData = allProviders?.slice(
        pagesVisited,
        pagesVisited + itemsPerPage
    );

    return (
        <Card>
            <h4 className="text-base mb-4">All Providers</h4>

            <Table>
                <THead>
                    <Tr>
                        <Th className="!text-gray-800">Display Name</Th>
                        <Th className="!text-gray-800">Category</Th>
                        <Th className="!text-gray-800">Phone</Th>
                        <Th className="!text-gray-800">Account Balance</Th>
                        <Th className="!text-gray-800">Account Verification</Th>
                        <Th className="!text-gray-800">Actions</Th>
                    </Tr>
                </THead>
                {allProviders.length < 1 && (
                    <TBody>
                        <Tr>
                            <Th colSpan={5} rowSpan={5} className="min-h-[20vh]">
                                <div className="min-h-[20vh] grid place-content-center">
                                    <p className="text-lg text-gray-400">
                                        No Providers
                                    </p>
                                </div>
                            </Th>
                        </Tr>
                    </TBody>
                )}
                {allProviders.length > 0 && paginationData?.map((item) => {
                    return (
                        <TBody key={item.id}>
                            <Tr>
                                <Td>{item.service?.title}</Td>
                                <Td>{item.service?.category.name}</Td>
                                {item.phone ? (
                                    <Td>
                                        +{item.phone}
                                    </Td>
                                ) : (
                                    <Td>
                                        -
                                    </Td>
                                )}
                                <Td>₦{item.balance?.toLocaleString()}</Td>
                                <Td className="text-red-500">
                                    Unverified
                                </Td>
                                <Td className="flex items-center gap-2">
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
                                        Requests({item.service.bookings.length})
                                    </Button>
                                    <Button
                                        variant="solid"
                                        size="xs"
                                    >
                                        Transactions
                                    </Button>
                                </Td>
                            </Tr>
                        </TBody>
                    )
                })}
            </Table>
            <Paginate
                data={allProviders}
                itemsPerPage={itemsPerPage}
                setPageNumber={setPageNumber}
                setItemsPerPage={setItemsPerPage}
            />
        </Card>
    )
}
export default AllProviders