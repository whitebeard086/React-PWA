import { Avatar, Card, MotionedDiv } from '@/components/ui'
import appConfig from '@/configs/app.config'
import acronym from '@/utils/acronym'
import useThemeClass from '@/utils/hooks/useThemeClass'
import useTwColorByName from '@/utils/hooks/useTwColorByName'
import { SystemConfigurationsResponse } from '@/views/system/utils/types'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

type Props = {
    data: Partial<SystemConfigurationsResponse>
}

const RecentCommissions = ({ data }: Props) => {
    const { imagePath } = appConfig
    const { textTheme } = useThemeClass()
    const color = useTwColorByName()
    const { recentCommissions } = data

    return (
        <Card>
            <div>
                <h4 className="">Recent Commissions</h4>
            </div>

            <div className="mt-4 flex flex-col gap-2">
                {recentCommissions?.length === 0 ? (
                    <div className="min-h-[15vh] grid place-content-center">
                        <p className="text-xl font-bold text-center">
                            No Commissions 
                        </p>
                    </div>
                ): recentCommissions?.map((item) => {
                    const name = `${item.service.title}`

                    return (
                        <MotionedDiv
                            key={item.id}
                            layoutId={`${item.id}`}
                        >
                            <div className='flex gap-4 justify-between w-full'>
                                <div className="w-full flex items-center gap-4">
                                    <div className="w-fit grid place-content-center">
                                        {item.service.banner ? (
                                            <Avatar 
                                                shape='circle'
                                                src={`${imagePath}/${item.service.banner}`}
                                            />
                                        ):(
                                            <Avatar shape="circle" className={`${color(name)}`}>
                                                {acronym(name)}
                                            </Avatar>
                                        )}
                                    </div>

                                    <div className="flex flex-col w-full">
                                        <Link
                                            to={`/services/${item.service.uid}`}
                                            className='w-fit'
                                        >
                                            <p className={`hover:${textTheme} font-semibold w-fit`}>
                                                {`${item.service.title}`}
                                            </p>
                                        </Link>
                                        <p className="text-xs font-semibold">
                                            {dayjs(item.created_at).format('DD/MM/YYYY HH:mm') }
                                        </p>
                                    </div>
                                </div>

                                <p className="font-semibold text-emerald-500">
                                    ₦{item.service_commission.toLocaleString()}
                                </p>
                            </div>
                        </MotionedDiv>
                    )
                })}
            </div>
        </Card>
    )
}
export default RecentCommissions