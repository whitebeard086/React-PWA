import { Avatar, Card } from "@/components/ui"
import { Link } from "react-router-dom"
import appConfig from "@/configs/app.config"
import useTwColorByName from "@/utils/hooks/useTwColorByName"
import acronym from "@/utils/acronym"
import dayjs from "dayjs"
import { GetHomeResponse } from '../../utils/types'
import useThemeClass from '@/utils/hooks/useThemeClass'

type Props = {
    data: Partial<GetHomeResponse>
}

const RecentCustomers = ({ data }:Props) => {
    const { imagePath } = appConfig
    const { textTheme } = useThemeClass()
    const color = useTwColorByName()
    const { recentCustomers } = data
    // const { recentCustomers } = useAppSelector((state) => state.home.data)
    return (
        <Card>
            <div className="flex items-center gap-4 justify-between">
                <h4 className="text-base">Recent Customers</h4>
                <Link to="/users/clients" className="text-sm text-blue-500 hover:text-blue-600 transition duration-300 underline cursor-pointer">
                    View All
                </Link>
            </div>

            <div className="mt-4 flex flex-col gap-2">
                {recentCustomers?.map((item) => {
                    const name = `${item.first_name} ${item.last_name}`

                    return (
                        <div key={item.id} className="w-full flex items-center gap-4">
                            <div className="w-fit">
                                {!item.image && (
                                    <Avatar shape="circle" className={`${color(name)}`}>
                                        {acronym(name)}
                                    </Avatar>
                                )}
                                {item.image && (
                                    <Avatar 
                                        shape="circle"
                                        src={`${imagePath}/${item.image}`}
                                    />
                                )}
                            </div>

                            <div className="w-full flex flex-col">
                                <Link
                                    to={`/users/clients/${item.slug}`}
                                    className='w-fit'
                                >
                                    <p className={`hover:${textTheme} font-semibold w-fit`}>
                                        {`${item.first_name} ${item.last_name}`}
                                    </p>
                                </Link>
                                <p className="text-xs font-semibold">
                                    {dayjs(item.created_at).format('DD/MM/YYYY HH:mm') }
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}
export default RecentCustomers