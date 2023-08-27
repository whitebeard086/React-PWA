import { Button, Card, Select, Table } from "@/components/ui"
import { useAppSelector } from "../../store"
import { useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const AllClients = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { Tr, Th, Td, THead, TBody } = Table
    const { allClients } = useAppSelector((state) => state.users.data)

    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(allClients?.length / itemsPerPage);
    const paginatedData = allClients?.slice(
        pagesVisited,
        pagesVisited + itemsPerPage
    );

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const paginationBtns = "pagination custom-pagination";
    const activeClassName = `custom-pagination-active text-white bg-gray-900 hover:bg-black`;
    const activeLinkClassName = `hover:bg-black rounded-md`;

    const pageSizes = useMemo(() => [5, 10, 15, 20], [])

    const pageSizeOption = useMemo(
        () =>
            pageSizes.map((number) => ({
                value: number,
                label: `${number} / page`,
            })),
        [pageSizes]
    )

    return (
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
                {allClients.length < 1 && (
                    <TBody>
                        <Tr>
                            <Th colSpan={5} rowSpan={5} className="min-h-[20vh]">
                                <div className="min-h-[20vh] grid place-content-center">
                                    <p className="text-lg text-gray-400">
                                        No Clients
                                    </p>
                                </div>
                            </Th>
                        </Tr>
                    </TBody>
                )}
                {allClients.length > 0 && paginatedData?.map((item) => {
                    return (
                        <TBody key={item.id}>
                            <Tr>
                                <Td>{`${item.first_name} ${item.last_name}` }</Td>
                                {item.phone && (
                                    <Td>
                                        +{item.phone}
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
                                        Bookings({item.bookings?.length})
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

            <div className="flex items-center justify-between mt-4">
                {allClients?.length > itemsPerPage && (
                    <>
                        <ReactPaginate
                            previousLabel={
                                <HiChevronLeft className="text-xl" />
                            }
                            nextLabel={
                                <HiChevronRight className="text-xl" />
                            }
                            pageCount={pageCount}
                            containerClassName={paginationBtns}
                            activeClassName={activeClassName}
                            activeLinkClassName={activeLinkClassName}
                            onPageChange={changePage}
                        />
                    </>
                )}
                <div style={{ minWidth: 130 }}>
                    <Select
                        size="sm"
                        menuPlacement="top"
                        isSearchable={false}
                        placeholder="Clients Per Page"
                        value={pageSizeOption.filter(
                            (option) => option.value === itemsPerPage
                        )}
                        options={pageSizeOption}
                        onChange={(option) =>
                            setItemsPerPage(option.value)
                        }
                    />
                </div>
            </div>
        </Card>
    )
}
export default AllClients