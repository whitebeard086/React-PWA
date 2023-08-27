import {
    Badge,
    Button,
    Dropdown,
    ScrollBar,
    Spinner,
    Tooltip,
} from "@/components/ui";
import classNames from "classnames";
import { useCallback } from "react";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AnimatePresence, motion } from "framer-motion";
import isLastChild from "@/utils/isLastChild";
import NotificationTypeAvatar from "./NotificationTypeAvatar";
import NotificationTypeContent from "./NotificationTypeContent";
import { Link, useNavigate } from "react-router-dom";
import {
    readAllNotifications,
    readNotification,
    setNotifications,
    setReadStatus,
} from "@/views/notifications/store/dataSlice";
import { BiLoader } from "react-icons/bi";
import { setSelected } from "@/views/notifications/store/stateSlice";
import { useEffect } from "react";
dayjs.extend(relativeTime);

const notificationHeight = "h-72";

const Notification = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { notification, notifications, reading, readStatus } = useSelector(
        (state) => state.notifications.data
    );
    const { selected } = useSelector((state) => state.notifications.state);
    const unreadNotifications = notifications?.some(
        (notification) => notification.is_read === false
    );

    const onMarkAsRead = useCallback(
        (id) => {
            dispatch(setSelected(id));
            dispatch(readNotification({ id }));
        },
        [dispatch]
    );

    const onMarkAllAsRead = () => {
        dispatch(readAllNotifications());
    };

    const NotificationToggle = () => {
        return (
            <div className="cursor-pointer transition duration-500 hover:bg-gray-200 h-9 w-9 rounded-full grid place-content-center">
                <div className="relative w-full h-full">
                    {notifications.length > 0 && unreadNotifications && (
                        <motion.div
                            key={1}
                            layoutId={1}
                            initial={{ opacity: 0, visibility: "hidden" }}
                            animate={{ opacity: 1, visibility: "visible" }}
                            transition={{ duration: 0.3, type: "tween" }}
                            exit={{ opacity: 0, visibility: "hidden" }}
                        >
                            <div className="h-3 w-3 animate-ping rounded-full bg-primary-500 absolute left-4" />
                            <div className="h-3 w-3 rounded-full bg-primary-500 absolute left-4 text-xs font-bold" />
                        </motion.div>
                    )}
                    <IoMdNotificationsOutline className="text-3xl" />
                </div>
            </div>
        );
    };

    useEffect(() => {
        if (readStatus === "success") {
            dispatch(setNotifications(notification));
            navigate(notification?.url);
        }

        dispatch(setSelected(null));
        dispatch(setReadStatus("idle"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [readStatus]);

    return (
        <Dropdown
            renderTitle={<NotificationToggle />}
            menuClass="p-0 min-w-[280px] md:min-w-[340px]"
            placement="bottom-end"
        >
            <Dropdown.Item variant="header">
                <div className="border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                    <h6 className="font-bold text-lg">Notifications</h6>
                    <Tooltip title="Mark all as read">
                        <Button
                            variant="plain"
                            shape="circle"
                            size="sm"
                            icon={<HiOutlineMailOpen className="text-xl" />}
                            onClick={onMarkAllAsRead}
                        />
                    </Tooltip>
                </div>
            </Dropdown.Item>

            <div className={classNames("overflow-y-auto", notificationHeight)}>
                <ScrollBar direction="ltr" className="z-20">
                    {notifications?.length < 1 ? (
                        <div
                            className={classNames(
                                "flex items-center justify-center",
                                notificationHeight
                            )}
                        >
                            <div className="text-center">
                                <h6 className="font-semibold">
                                    No notifications!
                                </h6>
                                <p className="mt-1">Please check again later</p>
                            </div>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {notifications?.map((item, index) => (
                                <motion.div
                                    key={item?.id}
                                    layoutId={item?.id}
                                    initial={{
                                        opacity: 0,
                                        visibility: "hidden",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        visibility: "visible",
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        type: "tween",
                                    }}
                                    exit={{ opacity: 0, visibility: "hidden" }}
                                >
                                    <div
                                        className={`relative flex px-4 py-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100  ${
                                            !isLastChild(notifications, index)
                                                ? "border-b border-gray-200"
                                                : ""
                                        }`}
                                        onClick={() => onMarkAsRead(item.id)}
                                    >
                                        <div>
                                            <NotificationTypeAvatar
                                                item={item}
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <NotificationTypeContent
                                                item={item}
                                            />
                                            <span className="text-xs block">
                                                {dayjs().to(
                                                    dayjs(item?.created_at)
                                                )}
                                            </span>
                                        </div>
                                        <Badge
                                            className="absolute top-4 right-4 mt-1.5"
                                            innerClass={`${
                                                item?.is_read
                                                    ? "bg-gray-300"
                                                    : "bg-primary-500"
                                            } `}
                                        />
                                        {item?.id === selected && reading && (
                                            <div className="absolute top-0 w-full h-full grid place-content-center">
                                                <Spinner
                                                    size={30}
                                                    indicator={BiLoader}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </ScrollBar>
            </div>
            <Dropdown.Item variant="header">
                <div className="flex justify-center border-t border-gray-200 px-4 py-2">
                    <Link
                        to="/profile/notifications"
                        className="font-semibold cursor-pointer p-2 px-3 text-gray-600 hover:text-gray-900"
                    >
                        View All Notifications
                    </Link>
                </div>
            </Dropdown.Item>
        </Dropdown>
    );
};
export default Notification;
