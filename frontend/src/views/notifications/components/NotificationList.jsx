import isLastChild from "@/utils/isLastChild";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelected } from "../store/stateSlice";
import { readNotification } from "../store/dataSlice";
import NotificationTypeAvatar from "@/views/layout/components/notification/NotificationTypeAvatar";
import NotificationTypeContent from "@/views/layout/components/notification/NotificationTypeContent";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Badge, Spinner } from "@/components/ui";
import { BiLoader } from "react-icons/bi";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
dayjs.extend(relativeTime);

const NotificationList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pageNumber, setPageNumber] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const {
        notification,
        notifications,
        reading,
        readStatus,
        readingAll,
        clearing,
    } = useSelector((state) => state.notifications.data);
    const { selected } = useSelector((state) => state.notifications.state);

    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(notifications?.length / itemsPerPage);
    const paginatedData = notifications?.slice(
        pagesVisited,
        pagesVisited + itemsPerPage
    );

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const paginationBtns = "pagination custom-pagination";
    const activeClassName = `custom-pagination-active text-white bg-gray-900 hover:bg-black`;
    const activeLinkClassName = `hover:bg-black rounded-md`;

    const onMarkAsRead = useCallback(
        (id) => {
            dispatch(setSelected(id));
            dispatch(readNotification({ id }));
        },
        [dispatch]
    );

    return (
        <div className="bg-white">
            {notifications?.length < 1 ? (
                <div className="text-center min-h-[40vh] flex flex-col items-center justify-center">
                    <h2 className="font-semibold text-lg">No notifications!</h2>
                    <p className="mt-1 text-base">Please check again later</p>
                </div>
            ) : (
                <div className="relative">
                    <AnimatePresence>
                        {paginatedData?.map((item, index) => (
                            <div key={item.id} className="relative">
                                <div
                                    className={`relative flex px-4 py-4 cursor-pointer bg-white hover:bg-gray-50 active:bg-gray-100  ${
                                        !isLastChild(paginatedData, index)
                                            ? "border-b border-gray-200"
                                            : ""
                                    }`}
                                    onClick={() => onMarkAsRead(item.id)}
                                >
                                    <div>
                                        <NotificationTypeAvatar item={item} />
                                    </div>
                                    <div className="ml-3">
                                        <NotificationTypeContent item={item} />
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
                            </div>
                        ))}
                    </AnimatePresence>
                    <div className="mt-4">
                        {notifications?.length > itemsPerPage && (
                            <>
                                <ReactPaginate
                                    previousLabel={
                                        <HiChevronLeft className="text-xl" />
                                    }
                                    nextLabel={
                                        <HiChevronRight className="text-xl" />
                                    }
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={paginationBtns}
                                    activeClassName={activeClassName}
                                    activeLinkClassName={activeLinkClassName}
                                />
                            </>
                        )}
                    </div>
                    {(readingAll || clearing) && (
                        <div className="absolute top-0 w-full h-[50vh] grid place-content-center">
                            <Spinner size={30} indicator={BiLoader} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default NotificationList;
