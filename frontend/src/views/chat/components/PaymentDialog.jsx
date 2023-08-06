import { useDispatch, useSelector } from "react-redux";
import { setViewingInvoice, togglePaymentDialog } from "../store/stateSlice";
import { Button, Dialog, Notification, Table, toast } from "@/components/ui";
import dayjs from "dayjs";
import useInvoiceData from "./invoice/useInvoiceData";
import { MdOutlineCancel } from "react-icons/md";
import { BiCheckDouble } from "react-icons/bi";
import {
    bookService,
    resetBookingStatus,
    setServiceBooked,
} from "../store/dataSlice";
import { useEffect } from "react";
import classNames from "classnames";
import { sendPushNotification } from "@/utils/sendPushNotification";
import appConfig from "@/configs/app.config";
import { socket } from "@/utils/socket";

const PaymentDialog = ({ state, providerSlug }) => {
    const dispatch = useDispatch();

    const { Tr, Th, Td, THead, TBody } = Table;

    const { paymentDialog, viewingInvoice } = useSelector(
        (state) => state.chat.state
    );
    const { invoice, chat, bookingService, bookingMessage, bookingStatus } =
        useSelector((state) => state.chat.data);
    const { profile } = useSelector((state) => state.auth.user);

    const provider = chat?.user?.service ? chat?.user : chat?.receiver;
    const receiver = chat?.user?.service ? chat.receiver : chat.user;
    const isReceiver = profile?.service ? false : true;
    const isPaid = invoice?.status === "paid" ? true : false;

    const { totalPrice } = useInvoiceData(invoice?.items);

    const onDialogClose = () => {
        dispatch(togglePaymentDialog(false));
    };

    const popNotification = (message, type, title, duration) => {
        toast.push(
            <Notification
                title={title || `${"Error"}`}
                type={type || `${"warning"}`}
                duration={duration || 3000}
            >
                {message}
            </Notification>,
            {
                placement: "top-center",
            }
        );
    };

    useEffect(() => {
        if (bookingMessage === "insufficient balance") {
            popNotification(
                "Insufficient balance, please top up and try again",
                "warning",
                "Error",
                5000
            );
        }

        dispatch(resetBookingStatus());
    }, [bookingMessage, dispatch]);

    useEffect(() => {
        if (bookingStatus === "success") {
            sendPushNotification({
                app_id: import.meta.env.VITE_ONESIGNAL_APP_ID,
                channel_for_external_user_ids: "push",
                include_external_user_ids: [`${receiver?.id}`],
                url: `${
                    appConfig.appURL
                }/chat/${profile?.username.toLowerCase()}`,
                contents: {
                    en: `Hello ${receiver?.username}, this is to inform you that ${profile?.username} has fully paid for invoice #${invoice?.invoice_number}, you may resume work.`,
                },
                content_available: true,
            });

            popNotification(
                "Service booked successfully",
                "success",
                "Success",
                5000
            );
        }

        dispatch(resetBookingStatus());
        dispatch(togglePaymentDialog(false));
        socket.emit(
            "bookedService",
            provider?.id,
            console.log("Emit Service Booked: ", true)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookingStatus]);

    // useEffect(() => {
    //     socket?.on("serviceBooked", (data) => {
    //         dispatch(setServiceBooked(true))
    //     })

    //     // dispatch(setServiceBooked(false))
    // }, [dispatch, socket])

    const onReady = () => {
        dispatch(setViewingInvoice(false));
    };

    const onBookService = () => {
        dispatch(
            bookService({
                service_id: provider?.service?.id,
                provider_id: provider?.id,
                user_id: profile?.id,
                invoice_id: invoice?.id,
                amount: invoice?.price,
            })
        );
    };

    return (
        <Dialog
            isOpen={paymentDialog}
            onClose={onDialogClose}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            scrollable
            className="overflow-y-auto"
            bodyOpenClassName="overflow-hidden"
            title={
                viewingInvoice
                    ? `Invoice #${invoice?.invoice_number}`
                    : "Confirm Service Payment"
            }
        >
            {!viewingInvoice && (
                <h4 className="text-lg font-bold text-gray-700">
                    Confirm Service Payment
                </h4>
            )}

            <div className="mt-6">
                {!viewingInvoice && (
                    <p>
                        Confirm payment for the following invoice. Don't worry,
                        we will hold onto the payment until the service has been
                        completed before we release it to the service provider.
                    </p>
                )}

                <div className="mt-4">
                    <div className="flex items-center gap-4 px-4 justify-between">
                        <h4 className="text-primary-500 font-bold">TASKITLY</h4>
                        <h4 className="font-bold text-2xl">INVOICE</h4>
                    </div>

                    <div className="mt-8 flex items-center gap-4 justify-between bg-blue-500 py-2 px-4 text-white">
                        <div>
                            <p className="font-semibold">
                                Invoice #{invoice?.invoice_number}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="font-bold">Date:</p>
                            <p className="font-semibold">
                                {dayjs(invoice?.created_at).format(
                                    "DD/MM/YYYY"
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 px-4">
                        <p className="font-semibold">
                            Invoice To: {receiver?.username}
                        </p>
                    </div>

                    <div className="mt-4">
                        <Table>
                            <THead>
                                <Tr className="bg-blue-500">
                                    <Th className="!text-white">No.</Th>
                                    <Th className="!text-white">Item</Th>
                                    <Th className="!text-white">Price</Th>
                                </Tr>
                            </THead>
                            <TBody>
                                {invoice?.items?.map((item, index) => (
                                    <Tr key={item.id} className="">
                                        <Td>{index + 1}</Td>
                                        <Td>{item.item}</Td>
                                        <Td>₦{item.price?.toLocaleString()}</Td>
                                    </Tr>
                                ))}
                            </TBody>
                        </Table>

                        <div
                            className={classNames(
                                "mt-4 flex items-center gap-4",
                                isPaid ? "justify-between" : "justify-end"
                            )}
                        >
                            {/* <h4 className="text-base px-4 py-2 bg-primary-500 rounded-md text-white">Fully Paid</h4> */}
                            <h4 className="text-right text-base text-white bg-blue-500 px-4 py-2">
                                Total: ₦{totalPrice?.toLocaleString()}
                            </h4>
                        </div>

                        {!viewingInvoice && !isPaid && (
                            <div className="mt-4 flex items-center gap-4">
                                <Button
                                    variant="solid"
                                    block
                                    size="sm"
                                    loading={bookingService}
                                    icon={<BiCheckDouble />}
                                    onClick={onBookService}
                                >
                                    Pay {invoice?.price?.toLocaleString()}
                                </Button>
                                <Button
                                    variant="solid"
                                    className="bg-red-500 hover:bg-red-600"
                                    block
                                    size="sm"
                                    disabled={bookingService}
                                    icon={<MdOutlineCancel />}
                                    onClick={onDialogClose}
                                >
                                    Cancel
                                </Button>
                            </div>
                        )}

                        {isReceiver && viewingInvoice && !isPaid && (
                            <div className="mt-4">
                                <Button
                                    variant="solid"
                                    block
                                    size="sm"
                                    onClick={onReady}
                                >
                                    Ready to Pay
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Dialog>
    );
};
export default PaymentDialog;
