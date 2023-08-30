import React, { useMemo } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import Select from "../Select";

interface PaginationProps {
    customPageSizes?: number[]
    data: object[]
    itemsPerPage: number
    setItemsPerPage: (value: number) => void
    setPageNumber: (value: number) => void
}

interface PageSizeOption {
    value: number
    label: string
}


const Paginate: React.FC<PaginationProps> = ({ data, itemsPerPage, setItemsPerPage, setPageNumber, customPageSizes }) => {

    const paginationBtns = "pagination custom-pagination";
    const activeClassName = `custom-pagination-active text-white bg-gray-900 hover:bg-black`;
    const activeLinkClassName = `hover:bg-black rounded-md`;

    const changePage = (selected: number) => {
        setPageNumber(selected);
    };

    const pageCount = Math.ceil(data?.length / itemsPerPage);

    const pageSizes = useMemo(() => customPageSizes || [5, 10, 15, 20], [customPageSizes])

    const pageSizeOption: PageSizeOption[] = useMemo(() =>
        pageSizes.map((number) => ({
            value: number,
            label: `${number} / page`,
        })), [pageSizes]
    )

    const handlePageSizeChange = (option: PageSizeOption) => {
        setItemsPerPage(option.value)
    }

    return (
        <div className="flex items-center justify-between mt-4">
            {data.length > itemsPerPage && (
                <ReactPaginate
                    previousLabel={<HiChevronLeft className="text-xl" />}
                    nextLabel={<HiChevronRight className="text-xl" />}
                    pageCount={pageCount}
                    containerClassName={paginationBtns}
                    activeClassName={activeClassName}
                    activeLinkClassName={activeLinkClassName}
                    onPageChange={(selected) => changePage(selected.selected)}
                />
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
                    onChange={(option) => handlePageSizeChange(option)}
                />
            </div>
        </div>
    )
}
export default Paginate