import { Button, Dialog, Notification, toast } from "components/ui";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux"
import { removeInvoiceItem, resetInvoice, setAddingItem, setInvoiceComplete, toggleInvoiceDialog } from "views/chat/store/stateSlice";
import { Table } from 'components/ui'
import { BiAddToQueue, BiReset } from "react-icons/bi";
import InvoiceForm from "./InvoiceForm";
import { motion, AnimatePresence } from "framer-motion";
import { MdDelete, MdOutlineDownloadDone } from "react-icons/md";
import useInvoiceData from "./useInvoiceData";
import { AiTwotoneEdit } from "react-icons/ai";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { useRef, useState } from "react";
import { makeInvoice, sendNewInvoiceNotification, setInvoiceStatus, setReceivedInvoice } from "views/chat/store/dataSlice";
import { BsFillSendFill } from "react-icons/bs";
import { useEffect } from "react";
import { sendPushNotification } from "utils/sendPushNotification";
import appConfig from "configs/app.config";
import { socket } from "utils/socket";

const InvoiceDialog = ({ receiver }) => {
    const dispatch = useDispatch();
    const invoiceRef = useRef(null);
    const [makingPDF, setMakingPDF] = useState(false);
    const [invoice, setInvoice] = useState(null);
    const { Tr, Th, Td, THead, TBody } = Table;
    
    const { invoiceDialog, invoiceComplete, invoiceData, addingItem, invoiceNumber } = useSelector((state) => state.chat.state)
    const { chat, invoiceStatus, makingInvoice, sendingMessage } = useSelector((state) => state.chat.data)
    const { profile } = useSelector((state) => state.auth.user)

    const { totalPrice } = useInvoiceData(invoiceData);

    const onDialogClose = () => {
        dispatch(toggleInvoiceDialog(false))
        if (addingItem) {
            dispatch(setAddingItem(false))
        }
    } 

    const popNotification = (message, type, title) => {
        toast.push(
            <Notification
                title={title || `${"Error"}`}
                type={type || `${"warning"}`}
                duration={3000}
            >
                {message}
            </Notification>,
            {
                placement: "top-center",
            }
        );
    };

    useEffect(() => {
        if (invoiceStatus === "success") {
            dispatch(sendNewInvoiceNotification({
                sender_id: profile?.id,
                receiver_id: receiver?.id,
            }))

            sendPushNotification({
                app_id: process.env.REACT_APP_ONESIGNAL_APP_ID,
                channel_for_external_user_ids: "push",
                include_external_user_ids: [`${receiver?.id}`],
                url: `${appConfig.appURL}/chat/${profile?.username.toLowerCase()}`,
                contents: {
                    en: `Hello ${receiver?.username}, you have received a new invoice from ${profile?.username}, please check your messages.`,
                },
                content_available: true,
            })
            popNotification("Invoice sent", "success", "Success")
        }

        onDialogClose()
        dispatch(setInvoiceStatus('idle'))
        socket?.emit("sendInvoice", receiver?.id, () => {
            console.log('Emit New Invoice: ', true);
        })
        // socket.emit("sendInvoice", (answer) => {
        //     // ...
        // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceStatus])
    
    // useEffect(() => {
    //     socket?.on("receiveInvoice", (data) => {
    //         dispatch(setReceivedInvoice(true))
    //     })
    // }, [dispatch, socket])

    // useEffect(() => {
    //     if (invoiceStatus === 'success' && messageStatus === 'sent') {
    //         popNotification("Invoice sent", "success", "Success")
    //     }

    //     onDialogClose()
    //     dispatch(setInvoiceStatus('idle'))
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [messageStatus, invoiceStatus])
    // console.log(JSON.stringify(invoiceData));
    

    const handleSend = () => {
        setMakingPDF(true);
        const dom = document.getElementById('print');
        toPng(dom)
            .then((dataUrl) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.src = dataUrl;
                img.onload = () => {
                    // Initialize PDF
                    const pdf = new jsPDF({
                        orientation: "portrait",
                        unit: "in",
                        format: [5.5, 8.5],
                        compress: true
                    });

                    // Define reused data
                    const imgProps = pdf.getImageProperties(img);
                    const imageType = imgProps.fileType;
                    const pdfWidth = pdf.internal.pageSize.getWidth();

                    // Calculate the number of pages.
                    const pxFullHeight = imgProps.height;
                    const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
                    const nPages = Math.ceil(pxFullHeight / pxPageHeight);

                    // Define pageHeight separately so it can be trimmed on the final page.
                    let pageHeight = pdf.internal.pageSize.getHeight();

                    // Create a one-page canvas to split up the full image.
                    const pageCanvas = document.createElement('canvas');
                    const pageCtx = pageCanvas.getContext('2d');
                    pageCanvas.width = imgProps.width;
                    pageCanvas.height = pxPageHeight;

                    for (let page = 0; page < nPages; page++) {
                        // Trim the final page to reduce file size.
                        if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
                            pageCanvas.height = pxFullHeight % pxPageHeight;
                            pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
                        }

                        // Display the page.
                        const w = pageCanvas.width;
                        const h = pageCanvas.height;
                        pageCtx.fillStyle = 'white';
                        pageCtx.fillRect(0, 0, w, h);
                        pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

                        // Add the page to the PDF.
                        if (page) pdf.addPage();
                        
                        const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
                        pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
                    }

                    // Output / Save
                    setMakingPDF(false);
                    setInvoice(pdf.output('blob'))
                    // pdf.save(`invoice-${invoiceNumber}.pdf`);
                    dispatch(makeInvoice({
                        invoice_number: invoiceNumber,
                        price: totalPrice,
                        chat_id: chat?.id,
                        receiver_id: receiver?.id,
                        invoiceData: JSON.stringify(invoiceData),
                        invoice: pdf.output('blob'),
                    })) 
                }
            })
            .catch((error) => {
                setMakingPDF(false);
                popNotification("Oops! Something went wrong! Please try again.")
                console.error('oops, something went wrong!', error);
            });
    }


    return (
        <Dialog
            isOpen={invoiceDialog}
            onClose={onDialogClose}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            scrollable
            // bodyOpenClassName="overflow-hidden"
            className="overflow-y-auto"
            // contentClassName=""
            title="Invoice"
        >
            <h4 className="text-lg font-bold text-gray-700">Generate Invoice</h4>
            <div className=" ">
                <div id="print" ref={invoiceRef} className="pb-4 mt-4">
                    <div className="flex items-center gap-4 px-4 justify-between">
                        <h4 className="text-primary-500 font-bold">TASKITLY</h4>
                        <h4 className="font-bold text-2xl">INVOICE</h4>
                    </div>

                    <div className="mt-8 flex items-center gap-4 justify-between bg-blue-500 py-2 px-4 text-white">
                        <div>
                            <p className="font-semibold">Invoice #{invoiceNumber}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="font-bold">
                                Date:
                            </p>
                            <p className="font-semibold">
                                {dayjs().format('DD/MM/YYYY') }
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 px-4">
                        <p className="font-semibold">
                            Invoice To: {receiver?.username}
                        </p>
                    </div>

                    <div className="mt-4">
                        <Table className="">
                            <THead className="">
                                <Tr className="bg-blue-500">
                                    <Th className="!text-white">No.</Th>
                                    <Th className="!text-white">Item</Th>
                                    <Th className="!text-white">Price</Th>
                                    {!invoiceComplete && (
                                        <Th className="!text-white"></Th>
                                    )}
                                </Tr>
                            </THead>
                            <TBody>
                                <AnimatePresence>
                                    {invoiceData?.length < 1 && (
                                        <Tr  className="w-full">
                                            <Td colSpan="4" className="font-bold text-base text-gray-400 text-center">
                                                Add items to the invoice
                                            </Td>
                                        </Tr>
                                    )}
                                    {invoiceData?.map((data, index) => (
                                        <motion.tr
                                            key={data.tid}
                                            layoutId={data.tid}
                                            initial={{ opacity: 0, visibility: "hidden" }}
                                            animate={{ opacity: 1, visibility: "visible" }}
                                            transition={{ duration: 0.2, type: "tween" }}
                                            exit={{ opacity: 0, visibility: "hidden" }}     
                                        >
                                                <Td className="">{index + 1}</Td>
                                                <Td className="">{data.item}</Td>
                                                <Td className="">₦{data.price?.toLocaleString()}</Td>
                                                {!invoiceComplete && (
                                                    <Td className="">
                                                        <Button
                                                            variant="solid"
                                                            className="bg-red-500 hover:bg-red-600"
                                                            size="xs"
                                                            color="red-500"
                                                            icon={<MdDelete />}
                                                            onClick={() => dispatch(removeInvoiceItem(data.tid))}
                                                        >
                                                            
                                                        </Button>
                                                    </Td>
                                                )}
                                            
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </TBody>
                        </Table>

                    </div>

                    <div className="mt-4 flex justify-end">
                        <h4 className="text-right text-base text-white bg-blue-500 px-4 py-2">
                            Total: ₦{invoiceData?.length < 1 ? 0 : totalPrice?.toLocaleString()}
                        </h4>
                    </div>
                    {addingItem && (
                        <InvoiceForm />
                    )}

                    {(!addingItem && !invoiceComplete) && (
                        <div className="flex items-center gap-4">
                            <Button
                                className="mt-4"
                                variant="solid"
                                size="sm"
                                icon={<BiAddToQueue />}
                                onClick={() => dispatch(setAddingItem(true))}
                            >
                                Add Item
                            </Button>

                            {invoiceData?.length > 0 && (
                                <Button
                                    className="mt-4"
                                    variant="solid"
                                    size="sm"
                                    icon={<MdOutlineDownloadDone />}
                                    onClick={() => dispatch(setInvoiceComplete(true))}
                                >
                                    Done
                                </Button>
                            )}
                        </div>
                    )}

                </div>
            
                {invoiceComplete && (
                    <div className="mt-4 flex items-center gap-4">
                        <Button
                            className="mt-4"
                            variant="solid"
                            size="sm"
                            icon={<BsFillSendFill />}
                            onClick={handleSend}
                            loading={makingPDF || makingInvoice || sendingMessage}
                        >
                            Send Invoice
                        </Button>
                        <Button
                            className="mt-4"
                            variant="solid"
                            size="sm"
                            disabled={makingPDF || makingInvoice || sendingMessage}
                            icon={<AiTwotoneEdit />}
                            onClick={() => dispatch(setInvoiceComplete(false))}
                        >
                            Modify
                        </Button>
                        {/* <Button
                            className="mt-4"
                            variant="solid"
                            size="sm"
                            // disabled={makingPDF || makingInvoice || sendingMessage}
                            icon={<BiReset />}
                            onClick={() => dispatch(resetInvoice())}
                        >
                            Reset
                        </Button> */}
                    </div>
                )}
            </div>
        </Dialog>
    )
}
export default InvoiceDialog