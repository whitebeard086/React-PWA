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

const LatestReferrals = ({ data }: Props) => {
    const { imagePath } = appConfig
    const { textTheme } = useThemeClass()
    const color = useTwColorByName()
    const { latestReferrals } = data

    return (
        <Card>
            <div>
                <h4 className="">Recent Referrals</h4>
            </div>

            <div className="mt-4 flex flex-col gap-2">
                {latestReferrals?.length === 0 ? (
                    <div className="min-h-[15vh] grid place-content-center">
                        <p className="text-xl font-bold text-center">
                            No Referrals 
                        </p>
                    </div>
                ): latestReferrals?.map((item) => {
                    const name = `${item.referrer.first_name} ${item.referrer.last_name}`

                    return (
                        <MotionedDiv
                            key={item.id}
                            layoutId={`${item.id}`}
                        >
                            <div className='flex gap-4 justify-between w-full'>
                                <div className="w-full flex items-center gap-4">
                                    <div className="w-fit grid place-content-center">
                                        {item.referrer.image ? (
                                            <Avatar 
                                                shape='circle'
                                                src={`${imagePath}/${item.referrer.image}`}
                                            />
                                        ):(
                                            <Avatar shape="circle" className={`${color(name)}`}>
                                                {acronym(name)}
                                            </Avatar>
                                        )}
                                    </div>

                                    <div className="flex flex-col w-full">
                                        <Link
                                            to={`/users/clients/${item.referrer.slug}`}
                                            className='w-fit'
                                        >
                                            <p className={`hover:${textTheme} font-semibold w-fit`}>
                                                {`${item.referrer.first_name} ${item.referrer.last_name}`}
                                            </p>
                                        </Link>
                                        <p className="text-xs font-semibold">
                                            {dayjs(item.created_at).format('DD/MM/YYYY HH:mm') }
                                        </p>
                                    </div>
                                </div>

                                <p className="font-semibold text-emerald-500">
                                    ₦{item.earned_bonus.toLocaleString()}
                                </p>
                            </div>
                        </MotionedDiv>
                    )
                })}
            </div>
        </Card>
    )
}
export default LatestReferrals