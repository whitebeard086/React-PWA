/* eslint-disable react/prop-types */
import { Avatar } from "@/components/ui"
import appConfig from "@/configs/app.config"
import acronym from "@/utils/acronym"
import useTwColorByName from "@/utils/hooks/useTwColorByName"
import { HiOutlineBan, HiOutlineCalendar, HiOutlineClipboardCheck } from "react-icons/hi"

const GeneratedAvatar = ({ target }) => {
    const name = `${target.first_name} ${target.last_name}`
    const color = useTwColorByName()
    const bg = color(name)
    return (
        <Avatar shape="circle" className={bg}>
            {acronym(name)}
        </Avatar>
    )
}

const NotificationTypeAvatar = (data) => {
    const { type, sender, status } = data.item
    console.log(type);

    const { imagePath } = appConfig

    switch (type) {
        case 'message':
            if (sender.service?.banner) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.service.banner}`} />
            } else if (sender.image) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.image}`} />
            } else {
                return <GeneratedAvatar target={sender} />
            }
        case 'invoice':
            if (sender.service?.banner) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.service.banner}`} />
            } else if (sender.image) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.image}`} />
            } else {
                return <GeneratedAvatar target={sender} />
            }
        case 'invoice paid':
            if (sender.image) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.image}`} />
            } else {
                return <GeneratedAvatar target={sender} />
            }
        case 'booking start':
            if (sender.service?.banner) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.service.banner}`} />
            } else if (sender.image) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.image}`} />
            } else {
                return <GeneratedAvatar target={sender} />
            }
        case 'booking cancelled':
            if (sender.service?.banner) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.service.banner}`} />
            } else if (sender.image) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.image}`} />
            } else {
                return <GeneratedAvatar target={sender} />
            }
        case 'booking disputed':
            if (sender.service?.banner) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.service.banner}`} />
            } else if (sender.image) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.image}`} />
            } else {
                return <GeneratedAvatar target={sender} />
            }
        case 'booking complete':
            if (sender.service?.banner) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.service.banner}`} />
            } else if (sender.image) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.image}`} />
            } else {
                return <GeneratedAvatar target={sender} />
            }
        case 'dispute message':
            if (sender.service?.banner) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.service.banner}`} />
            } else if (sender.image) {
                return <Avatar shape="circle" src={`${imagePath}/${sender.image}`} />
            } else {
                return <GeneratedAvatar target={sender} />
            }
        case 1:
            return (
                <Avatar
                    shape="circle"
                    className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100"
                    icon={<HiOutlineCalendar />}
                />
            )
        case 2:
            return (
                <Avatar
                    shape="circle"
                    className={
                        status === 'succeed'
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100'
                            : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100'
                    }
                    icon={
                        status === 'succeed' ? (
                            <HiOutlineClipboardCheck />
                        ) : (
                            <HiOutlineBan />
                        )
                    }
                />
            )
        default:
            return <Avatar />
    }
}
export default NotificationTypeAvatar