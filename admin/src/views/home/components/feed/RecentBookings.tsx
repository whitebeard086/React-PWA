import { Avatar, Card, Tag } from "@/components/ui"
import acronym from "@/utils/acronym"
import appConfig from "@/configs/app.config"
import useTwColorByName from "@/utils/hooks/useTwColorByName"
import dayjs from "dayjs"
import { GetHomeResponse } from '../../utils/types'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { RecentBookingWithInvoice, useAppDispatch } from '../../store'
import { setClient, setInvoice, setProvider, toggleInvoiceDialog } from '@/views/handyMan/inDispute/store'
import { Link } from 'react-router-dom'

type Props = {
    data: Partial<GetHomeResponse>
}

const RecentBookings = ( { data }:Props) => {
    const { imagePath } = appConfig
    const color = useTwColorByName()
    const { recentBookings } = data
    const { textTheme } = useThemeClass()
    const dispatch = useAppDispatch()

    const onViewInvoice = (item: RecentBookingWithInvoice) => {
        dispatch(setInvoice(item.invoice))
        dispatch(setClient(item.user))
        dispatch(setProvider(item.service.user))
        dispatch(toggleInvoiceDialog(true))
    }
    // const { recentBookings } = useAppSelector((state) => state.home.data)
    return (
        <Card>
            <div className="flex items-center gap-4 justify-between">
                <h4 className="text-base">Recent Bookings</h4>
                <Link to='/handy-man/active-bookings' className="text-sm text-blue-500 hover:text-blue-600 transition duration-300 underline cursor-pointer">
                    View All
                </Link>
            </div>

            <div className="mt-4 flex flex-col gap-2">
                {recentBookings?.map((item) => {
                    const name = `${item.user.first_name}`
                    return (
                        <div key={item.id} className="w-full items-center gap-4 justify-between">
                            <div className="w-full flex items-center gap-4">
                                <div className="w-fit">
                                    {!item.user.image && (
                                        <Avatar shape="circle" className={`${color(name)}`}>
                                            {acronym(name)}
                                        </Avatar>
                                    )}
                                    {item.user.image && (
                                        <Avatar 
                                            shape="circle"
                                            src={item?.user.image ? `${imagePath}/${item?.user.image}` : ""}
                                        />
                                    )}
                                </div>

                                <div className="w-full flex flex-col">
                                    <p className={`hover:${textTheme} font-semibold cursor-pointer w-fit`} onClick={() => onViewInvoice(item)}>
                                        #{item.invoice.invoice_number}
                                    </p>
                                    <p className="text-xs font-semibold">
                                        {dayjs(item.created_at).format('DD/MM/YYYY HH:mm') }
                                    </p>
                                </div>

                                <div className="w-fit flex flex-col gap-2">
                                    {item.status === 'ongoing' && (
                                        <Tag className="bg-blue-100 text-blue-500">
                                            {item.status}
                                        </Tag>
                                    )}
                                    {item.status === 'completed' && (
                                        <Tag className="bg-green-100 text-green-500">
                                            {item.status}
                                        </Tag>
                                    )}
                                    {item.status === 'disputed' && (
                                        <Tag className="bg-orange-100 text-orange-500">
                                            {item.status}
                                        </Tag>
                                    )}
                                    {item.status === 'refunded' && (
                                        <Tag className="bg-red-100 text-red-500">
                                            {item.status}
                                        </Tag>
                                    )}
                                    {item.status === 'cancelled' && (
                                        <Tag className="bg-red-100 text-red-500">
                                            {item.status}
                                        </Tag>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}
export default RecentBookings