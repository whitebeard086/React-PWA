import { Avatar, Card, Image } from "@/components/ui"
import appConfig from "@/configs/app.config"
import classNames from "classnames"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import EmojiPicker, { Emoji } from "emoji-picker-react"
import { AnimatePresence, motion } from "framer-motion"
import { useSelector } from "react-redux"
dayjs.extend(relativeTime)

const Messages = () => {
    const { dispute } = useSelector((state) => state.requests.data)
    const { profile, userType } = useSelector((state) => state.auth.user)
    const disputer = dispute?.disputer

    return (
        <AnimatePresence>
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
            {/* <EmojiPicker 
                skinTonePickerLocation="PREVIEW"
                unified="1f423"
            />
            <Emoji unified="1f423" size="25" /> */}
        </AnimatePresence>
    )
}
export default Messages