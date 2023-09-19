import { useMemo, useState, useEffect } from 'react'
import Table from '@/components/ui/Table'
import Input from '@/components/ui/Input'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import type { ColumnDef, FilterFn, ColumnFiltersState } from '@tanstack/react-table'
import type { InputHTMLAttributes } from 'react'
import { ChatWithMessages, setEnquiry, useAppDispatch, useAppSelector } from '../../store'
import { Avatar, Button, Card, Pagination, Select } from '@/components/ui'
import TableRowSkeleton from '@/components/shared/loaders/TableRowSkeleton'
import { Loading } from '@/components/shared'
import useThemeClass from '@/utils/hooks/useThemeClass'
import useTwColorByName from '@/utils/hooks/useTwColorByName'
import acronym from '@/utils/acronym'
import { Link } from 'react-router-dom'
import appConfig from '@/configs/app.config'

type Option = {
    value: number
    label: string
}
interface DebouncedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'prefix'> {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
}

const pageSizeOption = [
    { value: 5, label: '5 / page' },
    { value: 10, label: '10 / page' },
    { value: 15, label: '15 / page' },
    { value: 20, label: '20 / page' },
    { value: 30, label: '30 / page' },
    { value: 40, label: '40 / page' },
    { value: 50, label: '50 / page' },
]

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const DebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: DebouncedInputProps) => {
    
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <div className="flex justify-end">
            <div className="flex items-center">
                <Input
                    {...props}
                    value={value}
                    size='sm'
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

const GeneratedAvatar = ({ target }: { target: string }) => {
    const color = useTwColorByName()
    return (
        <Avatar size={28} shape="circle" className={`${color(target)}`}>
            {acronym(target)}
        </Avatar>
    )
}

const ActionColumn = ({ row }: { row: ChatWithMessages }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useAppDispatch()

    const onView = (enquiry: ChatWithMessages) => {
        dispatch(setEnquiry(enquiry))
    }

    return (
        <Link
            className={`${textTheme} cursor-pointer select-none font-semibold`}
            to={`/handy-man/messages/${row.uid}`}
            onClick={() => onView(row)}
        >
            <Button
                variant='solid'
                size='xs'
            >
                View
            </Button>
        </Link>
    )
}

const ServiceColumn = ({ row }: { row: ChatWithMessages }) => {
    const { textTheme } = useThemeClass()

    return (
        <>
            {row.user.service ? (
                <Link 
                    className={`hover:${textTheme} ml-2 font-semibold`}
                    to={`/services/${row.user.service.uid}`}

                >
                    {row.user.service.title}
                </Link>
            ):(
                <Link 
                    className={`hover:${textTheme} ml-2 font-semibold`}
                    to={`/services/${row.receiver.service?.uid}`}

                >
                    {row.receiver.service?.title}
                </Link>
            )}
        </>
    )
}

const ClientColumn = ({ row }: { row: ChatWithMessages }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            {row.user.service ? (
                row.receiver.image ? 
                <Avatar size={28} shape="circle" src={`${appConfig.imagePath}/${row.receiver.image}`} />
                : 
                <GeneratedAvatar target={`${row.receiver.first_name} ${row.receiver.last_name}`} />
            ):(
                row.user.image ? 
                <Avatar size={28} shape="circle" src={`${appConfig.imagePath}/${row.user.image}`} />
                : 
                <GeneratedAvatar target={`${row.user.first_name} ${row.user.last_name}`} />            
            )}
            {row.user.service ? (
                <Link
                    className={`hover:${textTheme} ml-2 font-semibold`}
                    to={`/users/clients/${row.receiver.slug}`}
                >
                    {`${row.receiver.first_name} ${row.receiver.last_name}`}
                </Link>
            ):(
                <Link
                    className={`hover:${textTheme} ml-2 font-semibold`}
                    to={`/users/clients/${row.user.slug}`}
                >
                    {`${row.user.first_name} ${row.user.last_name}`}
                </Link>
            )}
        </div>
    )
}

const ProviderColumn = ({ row }: { row: ChatWithMessages }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            {row.user.service ? (
                row.user.service?.banner ? 
                <Avatar size={28} shape="circle" src={`${appConfig.imagePath}/${row.user.service.banner}`} />
                : 
                row.user.image ?
                <Avatar size={28} shape="circle" src={`${appConfig.imagePath}/${row.user.image}`} />
                :
                <GeneratedAvatar target={`${row.user.first_name} ${row.user.last_name}`} />
            ):(
                row.receiver.service?.banner ? 
                <Avatar size={28} shape="circle" src={`${appConfig.imagePath}/${row.receiver.service.banner}`} />
                : 
                row.receiver.image ?
                <Avatar size={28} shape="circle" src={`${appConfig.imagePath}/${row.receiver.image}`} />
                :
                <GeneratedAvatar target={`${row.receiver.first_name} ${row.receiver.last_name}`} />          
            )}
            {row.user.service ? (
                <Link
                    className={`hover:${textTheme} ml-2 font-semibold`}
                    to={`/users/providers/${row.user.slug}`}
                >
                    {`${row.user.first_name} ${row.user.last_name}`}
                </Link>
            ):(
                <Link
                    className={`hover:${textTheme} ml-2 font-semibold`}
                    to={`/users/providers/${row.receiver.slug}`}
                >
                    {`${row.receiver.first_name} ${row.receiver.last_name}`}
                </Link>
            )}
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

const EnquiryList = () => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    const { enquiries: data, loading } = useAppSelector((state) => state.enquiries.data)

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }

    const totalData = data?.length

    const columns = useMemo<ColumnDef<ChatWithMessages>[]>(
        () => [
            { 
                header: 'Client', 
                accessorFn: row => row.user.service ? `${row.receiver.first_name} ${row.receiver.last_name}` : `${row.user.first_name} ${row.user.last_name}`,
                cell: (props) => {
                    const row = props.row.original
                    return <ClientColumn row={row} />
                }
            },
            { 
                header: 'Provider', 
                accessorFn: (row) => row.user.service ? `${row.user.first_name} ${row.user.last_name}` : `${row.receiver.first_name} ${row.receiver.last_name}`,
                cell: (props) => {
                    const row = props.row.original
                    return <ProviderColumn row={row} />
                }
            },
            { 
                header: 'Service', 
                accessorFn: (row) => row.user.service ? row.user.service?.title : row.receiver.service?.title,
                cell: (props) => {
                    const row = props.row.original
                    return <ServiceColumn row={row} />
                }
            },
            { 
                header: 'Category', 
                accessorFn: (row) => row.user.service ? row.user.service?.category.name : row.receiver.service?.category.name,
            },
            { 
                header: 'Messages', 
                accessorKey: 'messages_count'
            },
            { 
                header: '', 
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugHeaders: true,
        debugColumns: false,
    })

    return (
        <Loading loading={loading && data.length !== 0} type="cover">
            <Card>
                <div className="mb-4 flex items-center gap-4 justify-between">
                    <h4 className="text-base">Enquiries</h4>
                    <DebouncedInput
                        value={globalFilter ?? ''}
                        className="p-2 font-lg shadow border border-block"
                        placeholder="Search..."
                        onChange={(value) => setGlobalFilter(String(value))}
                    />
                </div>

                <Table>
                    <THead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    {...{
                                                        className:
                                                            header.column.getCanSort()
                                                                ? 'cursor-pointer select-none'
                                                                : '',
                                                        onClick:
                                                            header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    {
                                                        <Sorter
                                                            sort={header.column.getIsSorted()}
                                                        />
                                                    }
                                                </div>
                                            )}
                                        </Th>
                                    )
                                })}
                            </Tr>
                        ))}
                    </THead>
                    {loading && data?.length === 0 ? (
                        <TableRowSkeleton 
                            columns={columns.length}
                            rows={table.getState().pagination.pageSize}
                            avatarInColumns={[0,1]}
                            avatarProps={{width: 28, height: 28}}
                        />
                    ):(
                        <TBody>
                            {table.getRowModel().rows.map((row) => {
                                return (
                                    <Tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <Td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </Td>
                                            )
                                        })}
                                    </Tr>
                                )
                            })}
                        </TBody>
                    )}
                </Table>

                <div className="flex items-center justify-between mt-4">
                    <Pagination
                        pageSize={table.getState().pagination.pageSize}
                        currentPage={table.getState().pagination.pageIndex + 1}
                        total={totalData}
                        onChange={onPaginationChange}
                    />
                    <div style={{ minWidth: 130 }}>
                        <Select<Option>
                            size="sm"
                            menuPlacement="top"
                            isSearchable={false}
                            value={pageSizeOption.filter(
                                (option) =>
                                    option.value ===
                                    table.getState().pagination.pageSize
                            )}
                            options={pageSizeOption}
                            onChange={(option) => onSelectChange(option?.value)}
                        />
                    </div>
                </div>
            </Card>
        </Loading>
    )
}

export default EnquiryList