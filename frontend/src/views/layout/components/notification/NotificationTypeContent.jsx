import { TextEllipsis } from "@/components/shared";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const NotificationTypeContent = ({ item }) => {
    const { type, sender, data, url } = item;
    // const { profile } = useSelector((state) => state.auth.user)
    const messageData = JSON.parse(data);
    console.log(messageData);

    switch (type) {
        case 'message':
            if (sender.service) {
                return (
                    <div className="leading-tight">
                        <span className="font-bold">
                            {sender.service.title}{' '}
                        </span>
                        <span>sent you a message</span>
                        <span className="block text-xs font-bold heading-text">
                            <TextEllipsis text={messageData?.message} maxTextCount={60} />
                        </span>
                        <Link to={url} state={{ chat: messageData?.chat_id }} className="absolute w-full h-full top-0 left-0"/>
                    </div>
                )
            } else {
                return (
                    <div className="leading-tight">
                        <span className="font-bold">
                            {`${sender.first_name} ${sender.last_name}`}{' '}
                        </span>
                        <span>sent you a message</span>
                        <span className="block text-xs font-bold heading-text">
                            <TextEllipsis text={messageData?.message} maxTextCount={60} />
                        </span>
                        <Link to={url} state={{ chat: messageData?.chat_id }} className="absolute w-full h-full top-0 left-0"/>
                    </div>
                )
            }
        case 'invoice':
            if (sender.service) {
                return (
                    <div className="leading-tight">
                        <span className="font-bold heading-text">
                            New Invoice
                        </span>{' '}
                        <span>from</span>{' '}
                        <span className="font-bold block">
                            {sender.service.title}{' '}
                        </span>
                        <span className="heading-text font-bold">#{messageData.invoice_number}</span>
                        <Link to={url} state={{ chat: messageData?.chat_id }} className="absolute w-full h-full top-0 left-0"/>
                    </div>
                )
            } else {
                return (
                    <div className="leading-tight">
                        <span className="font-bold">
                            {`${sender.first_name} ${sender.last_name}`}{' '}
                        </span>
                        <span>sent you a message</span>
                        <span className="block text-xs font-bold heading-text">
                            <TextEllipsis text={messageData?.message} maxTextCount={60} />
                        </span>
                        <Link to={url} state={{ chat: messageData?.chat_id }} className="absolute w-full h-full top-0 left-0"/>
                    </div>
                )
            }
        case 'invoice paid':
            return (
                <div className="leading-tight">
                    <span className="font-bold">
                        {`${sender.first_name} ${sender.last_name}`}{' '}
                    </span>
                    <span>
                        has paid for invoice{' '}
                        <span className="font-bold heading-text">
                            #{messageData.invoice_number}
                        </span>
                    </span>
                    <Link to={url} state={{ chat: messageData?.chat_id }} className="absolute w-full h-full top-0 left-0"/>
                </div>
            )
        case 'booking start':
            return (
                <div className="leading-tight">
                    <span className="font-bold">
                        {`${sender.service?.title}`}{' '}
                    </span>
                    <span>
                        has started working on your service
                    </span>
                    <Link to={url} state={{ chat: messageData?.chat_id }} className="absolute w-full h-full top-0 left-0"/>
                </div>
            )
        case 'booking cancelled':
            return (
                <div className="leading-tight">
                    <span className="font-bold">
                        {`${sender.service?.title}`}{' '}
                    </span>
                    <span>
                        has cancelled the service request{' '}
                        <span className="font-bold heading-text">
                            #{messageData.invoice_number},
                        </span>{' '}
                        your refund will be processed shortly.
                    </span>
                    <Link to={url} state={{ chat: messageData?.chat_id }} className="absolute w-full h-full top-0 left-0"/>
                </div>
            )
    }
}
export default NotificationTypeContent