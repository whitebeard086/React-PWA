import { Referral } from '@/@types/common'
import { useEffect, useMemo, useState } from 'react'
import { flexRender, getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import { Avatar, Card, Input, Pagination, Select, Table } from '@/components/ui'
import useTwColorByName from '@/utils/hooks/useTwColorByName'
import acronym from '@/utils/acronym'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { Link } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import { Loading } from '@/components/shared'
import TableRowSkeleton from '@/components/shared/loaders/TableRowSkeleton'
import dayjs from 'dayjs'
import type { ColumnDef, FilterFn, ColumnFiltersState } from '@tanstack/react-table'
import type { InputHTMLAttributes } from 'react'

type Props = {
    referrals: Referral[]
    loading: boolean
}

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

const ReferrerColumn = ({ row }: { row: Referral }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            {row.referrer.image ? (
                <Avatar size={28} shape="circle" src={`${appConfig.imagePath}/${row.referrer.image}`} />
            ):( 
                <GeneratedAvatar target={`${row.referrer.first_name} ${row.referrer.last_name}`} />
            )}
            <Link
                className={`hover:${textTheme} ml-2 font-semibold`}
                to={`/users/clients/${row.referrer.slug}`}
            >
                {`${row.referrer.first_name} ${row.referrer.last_name}`}
            </Link>
        </div>
    )
}

const ReferredColumn = ({ row }: { row: Referral }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            {row.referred.image ? (
                <Avatar size={28} shape="circle" src={`${appConfig.imagePath}/${row.referred.image}`} />
            ):( 
                <GeneratedAvatar target={`${row.referred.first_name} ${row.referred.last_name}`} />
            )}
            <Link
                className={`hover:${textTheme} ml-2 font-semibold`}
                to={`/users/clients/${row.referred.slug}`}
            >
                {`${row.referred.first_name} ${row.referred.last_name}`}
            </Link>
        </div>
    )
}

const EarnedAmountColumn = ({ row }: { row: Referral }) => {
    const { textTheme } = useThemeClass()

    return (
        <div 
            className={`${textTheme} ml-2 font-semibold cursor-pointer`}
        >
            ₦{row.earned_bonus.toLocaleString()}
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

const Referrals = ({ referrals:data, loading }: Props) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }
    

    const totalData = data?.length

    const columns = useMemo<ColumnDef<Referral>[]>(
        () => [
            { 
                header: 'Referrer', 
                accessorFn: row => `${row.referrer.first_name} ${row.referrer.last_name}`,
                cell: (props) => {
                    const row = props.row.original
                    return <ReferrerColumn row={row} />
                }
            },
            { 
                header: 'Referred Customer', 
                accessorFn: row => `${row.referred.first_name} ${row.referred.last_name}`,
                cell: (props) => {
                    const row = props.row.original
                    return <ReferredColumn row={row} />
                }
            },
            { 
                header: 'Bonus Earned', 
                accessorFn: (row) => row.earned_bonus,
                cell: (props) => {
                    const row = props.row.original
                    return <EarnedAmountColumn row={row} />
                }
            },
            { 
                header: 'Date', 
                accessorKey: 'created_at',
                cell: (props) => {
                    const row = props.row.original
                    return dayjs(row.created_at).format('DD/MM/YYYY HH:mm')
                },
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
                    <h4 className="text-base">All Referrals</h4>
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
                                        <Th key={header.id} colSpan={header.colSpan}>
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
                    {!loading && data?.length === 0 && (
                        <TBody>
                            <Tr>
                                <Td colSpan={6}>
                                    <div className="p-4 min-h-[150px] text-xl font-semibold text-gray-400 grid place-content-center">
                                        No data to display
                                    </div>
                                </Td>
                            </Tr>
                        </TBody>
                    )}
                    {loading && data?.length === 0 ? (
                        <TableRowSkeleton 
                            columns={columns.length}
                            rows={table.getState().pagination.pageSize}
                            avatarInColumns={[0]}
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
export default Referrals