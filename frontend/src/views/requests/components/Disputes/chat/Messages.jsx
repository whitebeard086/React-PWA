/* eslint-disable react/prop-types */
import { Avatar, Card, Image } from "@/components/ui"
import appConfig from "@/configs/app.config"
import classNames from "classnames"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
dayjs.extend(relativeTime)

const Messages = ({ isOwner, receiver }) => {
    const scroll = useRef();
    const { dispute, disMessages } = useSelector((state) => state.requests.data)
    const { profile } = useSelector((state) => state.auth.user)
    const disputer = dispute?.disputer

    useEffect(() => {
		// Scroll to the last message
		scroll.current?.scrollIntoView({ behavior: 'smooth' });
	}, [disMessages]);

    return (
        <>
            <div
                className={classNames(
                    'flex gap-2 items-start',
                    profile?.id === dispute?.disputer_id ? 'justify-end' : 'justify-start'
                )}
            >
                {profile?.id !== dispute?.disputer_id && (
                    <Avatar
                        src={disputer?.service ? `${appConfig.imagePath}/${disputer?.service?.banner || disputer?.image}` : `${appConfig.imagePath}/${disputer?.image}`}
                        size="sm"
                        shape="circle"
                    />
                )}
                <div className="mb-4 max-w-[80%] w-fit">
                    <Card
                        className={classNames(
                            'max-w-[100%] w-full',
                            profile?.id === dispute?.disputer_id ? 'bg-primary-500 text-white' : ''
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
                {profile?.id === dispute?.disputer_id && (
                    <Avatar
                        src={disputer?.service ? `${appConfig.imagePath}/${disputer?.service?.banner || disputer?.image}` : `${appConfig.imagePath}/${disputer?.image}`}
                        size="sm"
                        shape="circle"
                    />
                )}
            </div>
            <AnimatePresence>
                {disMessages?.map((message) => {
                    const owner = isOwner(message);
                    return (
                        <motion.div
                            key={message?.id}
                            id={message?.id}
                            ref={scroll}
                            initial={{ opacity: 0, visibility: 'hidden' }}
                            animate={{ opacity: 1, visibility: 'visible' }}
                            transition={{ duration: 0.3, type: 'tween' }}
                            exit={{ opacity: 0, visibility: 'hidden' }}
                            layoutId={message?.id}
                            className={classNames(
                                'flex gap-2 items-start',
                                owner ? 'justify-end' : 'justify-start'
                            )}
                        >
                            {!owner && (
                                <Avatar src={`${appConfig.imagePath}/${receiver?.service?.banner || receiver?.image}`}
                                    size="sm"
                                    shape="circle"
                                />
                            )}
                            <div className="mb-4 max-w-[80%] w-fit">
                                <Card
                                    className={classNames(
                                        'max-w-[100%] w-full',
                                        owner ? 'bg-primary-500 text-white' : ''
                                    )}
                                >
                                    <div className="flex gap-2">
                                        {message.media?.length > 0 ? 
                                            <div>
                                                {message.media.map((item) => (
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
                            {owner && (
                                <Avatar
                                    src={`${appConfig.imagePath}/${profile?.service?.banner || profile?.image}`}
                                    size="sm"
                                    shape="circle"
                                />
                            )}
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </>
    )
}
export default Messages