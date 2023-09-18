import { InvoiceWithItems, UserWithService } from '@/@types/common'
import { Dialog, Table } from '@/components/ui'
import classNames from 'classnames'
import dayjs from 'dayjs'

type Props = {
    invoiceDialog: boolean
    invoice: Partial<InvoiceWithItems>
    client: Partial<UserWithService>
    totalPrice: number
    onDialogClose: () => void
}

const InvoiceDialog = ({ client, invoice, invoiceDialog, totalPrice, onDialogClose }: Props) => {
    const { Tr, Th, Td, THead, TBody } = Table;

    return (
        <Dialog
            isOpen={invoiceDialog}
            scrollable={true}
            onRequestClose={onDialogClose}
            onClose={onDialogClose}
        >
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
                        Invoice To: {client?.username}
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
                            "mt-4 flex items-center justify-end gap-4",
                        )}
                    >
                        {/* <h4 className="text-base px-4 py-2 bg-primary-500 rounded-md text-white">Fully Paid</h4> */}
                        <h4 className="text-right text-base text-white bg-blue-500 px-4 py-2">
                            Total: ₦{totalPrice?.toLocaleString()}
                        </h4>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
export default InvoiceDialog