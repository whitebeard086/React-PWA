import { Avatar, Button, Card } from '@/components/ui'
import appConfig from '@/configs/app.config'
import { DisputeWithDetails } from '@/views/handyMan/types'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { HiOutlineUser } from 'react-icons/hi'
import { Link } from 'react-router-dom'

type Props = {
    className?: string
    dispute: Partial<DisputeWithDetails>
}

const Details = ({ className, dispute }: Props) => {
    const { disputer, client, provider } = dispute

    return (
        <Card className={classNames(className)}>
            <h4 className="text-base mb-8">Dispute Details</h4>

            <div className="mb-4">
                <p className="text-base mb-4 font-semibold">Client</p>
                <Link to={`/users/clients/${client?.username}`} className="flex items-center gap-2 w-fit">
                    <Avatar 
                        shape="circle"
                        className="shadow-md"
                        icon={<HiOutlineUser />}
                        src={`${appConfig.imagePath}/${client?.image}`}
                    />
                    <div  className="">
                        <h4 className="text-sm hover:text-emerald-500 transition duration-200">
                            {`${client?.first_name} ${client?.last_name}`}
                        </h4>
                    </div>
                </Link>
            </div>

            <div className="mb-4">
                <p className="text-base mb-4 font-semibold">Provider</p>
                <Link to={`/services/${provider?.service?.uid}`} className="flex items-center gap-2 w-fit">
                    <Avatar 
                        shape="circle"
                        className="shadow-md"
                        icon={<HiOutlineUser />}
                        src={`${appConfig.imagePath}/${provider?.service?.banner}`}
                    />
                    <div  className="">
                        <h4 className="text-sm hover:text-emerald-500 transition duration-200">
                            {provider?.service?.title}
                        </h4>
                    </div>
                </Link>
            </div>

            <p className="text-base mb-4 font-bold">Actions</p>

            <div className="mb-4">
                <div className="flex flex-col gap-2">
                    <Button
                        variant="solid"
                        color="red-600"
                    >
                        Refund Client
                    </Button>
                    <Button
                        variant="solid"
                    >
                        Pay Provider
                    </Button>
                </div>
            </div>

        </Card>
    )
}
export default Details