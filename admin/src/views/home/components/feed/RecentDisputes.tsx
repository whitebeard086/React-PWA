import { useState, useMemo } from 'react'
import { Avatar, Button, Card, Table } from '@/components/ui'
import dayjs from 'dayjs'
import { flexRender, getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import { GetHomeResponse } from '../../utils/types'
import useTwColorByName from '@/utils/hooks/useTwColorByName'
import acronym from '@/utils/acronym'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { DisputeWithDetails, GetDisputeRequest, GetDisputeResponse } from '@/views/handyMan/types'
import { useAppDispatch } from '../../store'
import { useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { setClient, setDispute, setInvoice, setProvider, toggleInvoiceDialog } from '@/views/handyMan/inDispute/store'
import { apiGetDispute } from '@/services/HandymanService'
import appConfig from '@/configs/app.config'
import type { ColumnDef, FilterFn, ColumnFiltersState } from '@tanstack/react-table'
import type { InputHTMLAttributes } from 'react'
import { Loading } from '@/components/shared'
import TableRowSkeleton from '@/components/shared/loaders/TableRowSkeleton'

type Props = {
    data: Partial<GetHomeResponse>
    loading: boolean
}

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const GeneratedAvatar = ({ target }: { target: string }) => {
    const color = useTwColorByName()
    return (
        <Avatar shape="circle" className={`${color(target)}`}>
            {acronym(target)}
        </Avatar>
    )
}

const ActionColumn = ({ row }: { row: DisputeWithDetails }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const onView = (dispute: DisputeWithDetails) => {
        dispatch(setDispute(dispute))
        navigate(`/handy-man/bookings-in-dispute/${dispute.uid}`)
    }

    const onMouseEnter = (data: GetDisputeRequest) => {
        queryClient.prefetchQuery({
            queryKey: ['disputes', data],
            queryFn: async () => {
                const response = await apiGetDispute<GetDisputeResponse, GetDisputeRequest>(data);
                return response.data;
            },
            staleTime: 60 * 1000,
            
        })
    }

    return (
        <div className="flex items-center gap-2" onMouseEnter={() => onMouseEnter({ uid: row.uid })}>
            <Button
                variant='solid'
                size='xs'
                color="slate-900"
                onClick={() => onView(row)}
            >
                View
            </Button>
            {/* <Button
                variant="solid"
                size="xs"
                color="red-600"
            >
                Refund Client
            </Button>
            <Button
                variant="solid"
                size="xs"
            >
                Pay Provider
            </Button> */}
        </div>
    )
}

const ClientColumn = ({ row }: { row: DisputeWithDetails }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            {row.client.image ? (
                <Avatar size={28} shape="circle" src={`${appConfig.imagePath}/${row.client.image}`} />
            ):( 
                <GeneratedAvatar target={`${row.client.first_name} ${row.client.last_name}`} />
            )}
            <Link
                className={`hover:${textTheme} ml-2 font-semibold`}
                to={`/users/clients/${row.client.slug}`}
            >
                {`${row.client.first_name} ${row.client.last_name}`}
            </Link>
        </div>
    )
}

const ServiceColumn = ({ row }: { row: DisputeWithDetails }) => {
    const { textTheme } = useThemeClass()

    return (
        <>
            <Link 
                className={`hover:${textTheme} ml-2 font-semibold`}
                to={`/services/${row.provider?.service?.uid}`}

            >
                {row.provider?.service?.title}
            </Link>
        </>
    )
}

const InvoiceColumn = ({ row }: { row: DisputeWithDetails }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useAppDispatch()

    const onViewInvoice = () => {
        dispatch(setInvoice(row.invoice))
        dispatch(setClient(row.client))
        dispatch(setProvider(row.provider))
        dispatch(toggleInvoiceDialog(true))
    }

    return (
        <>
            <div 
                className={`hover:${textTheme} ml-2 font-semibold cursor-pointer`}
                onClick={onViewInvoice}
            >
                #{row.invoice.invoice_number}
            </div>
        </>
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

const RecentDisputes = ({ data: homeData, loading }: Props) => {
    const { recentDisputes: data } = homeData
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    const columns = useMemo<ColumnDef<DisputeWithDetails>[]>(
        () => [
            { 
                header: 'Client', 
                accessorFn: row => `${row.client.first_name} ${row.client.last_name}`,
                cell: (props) => {
                    const row = props.row.original
                    return <ClientColumn row={row} />
                }
            },
            { 
                header: 'Service', 
                accessorFn: (row) => row.provider.service?.title,
                cell: (props) => {
                    const row = props.row.original
                    return <ServiceColumn row={row} />
                }
            },
            { 
                header: 'Category', 
                accessorFn: (row) => row.provider.service?.category.name,
            },
            { 
                header: 'Invoice', 
                accessorFn: (row) => row.invoice.invoice_number,
                cell: (props) => {
                    const row = props.row.original
                    return <InvoiceColumn row={row} />
                }
            },
            { 
                header: 'Service Cost', 
                accessorFn: (row) => row.invoice.price,
                cell: (props) => {
                    const row = props.row.original
                    return `₦${row.invoice.price?.toLocaleString()}`
                },
            },
            {
                header: 'Status',
                accessorKey: 'status'
            },
            { 
                header: 'Time Started', 
                accessorKey: 'created_at',
                cell: (props) => {
                    const row = props.row.original
                    return dayjs(row.created_at).format('DD/MM/YYYY HH:mm')
                },
            },
            { 
                header: 'Actions', 
                enableSorting: false,
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const table = useReactTable({
        data: data ?? [],
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
        <Loading loading={loading && data?.length !== 0} type="cover">
            <Card>
                <h4 className="text-base">Recent Disputes</h4>

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

            </Card>
        </Loading>
    )
}
export default RecentDisputes
