import { ConfirmDialog } from '@/components/shared'
import { Avatar, Button, Card } from '@/components/ui'
import appConfig from '@/configs/app.config'
import { useRefundClient } from '@/views/handyMan/hooks'
import { DisputeWithDetails } from '@/views/handyMan/types'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { HiOutlineUser } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import RefundClient from './RefundClient'
import PayProvider from './PayProvider'

type Props = {
    className?: string
    dispute: Partial<DisputeWithDetails>
    uid: string
}

const Details = ({ className, dispute, uid }: Props) => {
    const [refundOpen, setRefundOpen] = useState(false)
    const [payProvider, setPayProvider] = useState(false)
    const { client, provider } = dispute

    const onRefundClientOpen = () => {
        setRefundOpen(true)
    }

    const onPayProviderOpen = () => {
        setPayProvider(true)
    }

    return (
        <Card className={classNames(className)}>
            <h4 className="text-base mb-8">Dispute Details</h4>

            <div className="mb-4">
                <p className="text-base mb-4 font-semibold">Client</p>
                <Link
                    to={`/users/clients/${client?.username}`}
                    className="flex items-center gap-2 w-fit"
                >
                    <Avatar
                        shape="circle"
                        className="shadow-md"
                        icon={<HiOutlineUser />}
                        src={`${appConfig.imagePath}/${client?.image}`}
                    />
                    <div className="">
                        <h4 className="text-sm hover:text-emerald-500 transition duration-200">
                            {`${client?.first_name} ${client?.last_name}`}
                        </h4>
                    </div>
                </Link>
            </div>

            <div className="mb-4">
                <p className="text-base mb-4 font-semibold">Provider</p>
                <Link
                    to={`/services/${provider?.service?.uid}`}
                    className="flex items-center gap-2 w-fit"
                >
                    <Avatar
                        shape="circle"
                        className="shadow-md"
                        icon={<HiOutlineUser />}
                        src={`${appConfig.imagePath}/${provider?.service?.banner}`}
                    />
                    <div className="">
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
                        onClick={onRefundClientOpen}
                    >
                        Refund Client
                    </Button>
                    <Button variant="solid" onClick={onPayProviderOpen}>
                        Pay Provider
                    </Button>
                </div>
            </div>

            <RefundClient
                client={client}
                refundOpen={refundOpen}
                setRefundOpen={setRefundOpen}
                uid={uid}
            />
            <PayProvider 
                payProvider={payProvider}
                provider={provider ?? {}}
                setPayProvider={setPayProvider}
                uid={uid}
            />
        </Card>
    )
}
export default Details
