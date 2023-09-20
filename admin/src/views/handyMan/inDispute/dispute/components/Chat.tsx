import { Avatar, Card, Image, Tooltip } from '@/components/ui'
import { DisputeWithDetails } from '@/views/handyMan/types'
import classNames from 'classnames'
import { AiOutlineWechat } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion'
import appConfig from '@/configs/app.config'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

dayjs.extend(relativeTime)

type Props = {
    dispute: Partial<DisputeWithDetails>
    className?: string
}

const Chat = ({ className, dispute }: Props) => {
    const scroll = useRef<null | HTMLDivElement>(null);

    const { disputer, client, provider, messages } = dispute

    useEffect(() => {
		// Scroll to the last message
		scroll.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);
    
    return (
        <div className={classNames(className)}>
            <Card className="mb-4">
                <div className="flex items-center gap-2">
                    <Avatar 
                        shape="circle"
                        size={"lg"}
                        icon={<AiOutlineWechat />}
                        className="bg-emerald-500"
                    />
                    <h4 className="text-base">Dispute Chat</h4>
                </div>
            </Card>

            <div
                className={classNames(
                    'flex gap-2 items-start',
                    provider?.id === disputer?.id ? 'justify-end' : 'justify-start'
                )}
            >
                {provider?.id !== disputer?.id && (
                    <Tooltip title={`${client?.first_name} ${client?.last_name}`}>
                        <Link to={`/users/clients/${client?.username}`}>
                            <Avatar
                                src={`${appConfig.imagePath}/${disputer?.image}`}
                                size="sm"
                                shape="circle"
                            />
                        </Link>
                    </Tooltip>
                )}
                <div className="mb-4 max-w-[80%] w-fit">
                    <Card
                        className={classNames(
                            'max-w-[100%] w-full',
                            provider?.id === disputer?.id ? 'bg-emerald-500 text-white' : ''
                        )}
                    >
                        <div className="flex gap-2">
                            {dispute?.description && <p>{dispute?.description}</p>}
                        </div>
                    </Card>
                    <p className="text-left">
                        {dayjs(dispute?.created_at).fromNow()}
                    </p>
                </div>
                {provider?.id === disputer?.id && (
                    <Tooltip title={`${disputer?.service?.title}`}>
                        <Link to={`/services/${disputer?.service?.uid}`}>
                            <Avatar
                                src={`${appConfig.imagePath}/${disputer?.service?.banner}`}
                                size="sm"
                                shape="circle"
                            />
                        </Link>
                    </Tooltip>
                )}
            </div>

            <AnimatePresence>
                {messages?.map((message) => {
                    return (
                        <motion.div
                            ref={scroll}
                            key={message?.id}
                            initial={{ opacity: 0, visibility: 'hidden' }}
                            animate={{ opacity: 1, visibility: 'visible' }}
                            transition={{ duration: 0.3, type: 'tween' }}
                            exit={{ opacity: 0, visibility: 'hidden' }}
                            className={classNames(
                                'flex gap-2 items-start',
                                message.sender_id === provider?.id ? 'justify-end' : 'justify-start'
                            )}
                        >
                            {message.sender_id !== provider?.id && (
                                <Tooltip title={`${client?.first_name} ${client?.last_name}`}>
                                    <Link to={`/users/clients/${client?.username}`}>
                                        <Avatar src={`${appConfig.imagePath}/${client?.image}`}
                                            size="sm"
                                            shape="circle"
                                        />
                                    </Link>
                                </Tooltip>
                            )}
                            <div className="mb-4 max-w-[80%] w-fit">
                                <Card
                                    className={classNames(
                                        'max-w-[100%] w-full',
                                        message.sender_id === provider?.id ? 'bg-emerald-500 text-white' : ''
                                    )}
                                >
                                    <div className="flex gap-2">
                                        {message?.media && message?.media?.length > 0 ? 
                                            <div>
                                                {message.media?.map((item) => (
                                                    <div key={item.id} className="w-full">
                                                        <Image 
                                                            src={`${appConfig.imagePath}/${item.file}`}
                                                        />
                                                    </div>
                                                ))}
                                                <p>{message.message}</p>
                                            </div>
                                        : (
                                            <p>{message.message}</p>
                                        )}
                                    </div>
                                </Card>
                                <p className="text-left">
                                    {dayjs(message?.created_at).fromNow()}
                                </p>
                            </div>
                            {message.sender_id === provider?.id && (
                                <Tooltip title={provider?.service?.title}>
                                    <Link to={`/services/${provider?.service?.uid}`}>
                                        <Avatar
                                            src={`${appConfig.imagePath}/${provider?.service?.banner || provider.image}`}
                                            size="sm"
                                            shape="circle"
                                        />
                                    </Link>
                                </Tooltip>
                            )}
                        </motion.div>
                    )
                })}
            </AnimatePresence>
            {/* // TODO: Admin response in the chat */}
        </div>
    )
}
export default Chat