import { injectReducer } from '@/store'
import reducer, { SLICE_NAME, useAppSelector, useAppDispatch, cleanInvoiceDialog } from '../activeBookings/store'
import { useGetCompleteBookings, useInvoiceData } from '../hooks'
import StatCards from '@/views/home/components/feed/StatCards'
import Bookings from '../activeBookings/components/Bookings'
import InvoiceDialog from '../activeBookings/components/InvoiceDialog'

injectReducer(SLICE_NAME, reducer )

const CompletedBookings = () => {
    const dispatch = useAppDispatch()
    const { data, isLoading } = useGetCompleteBookings()
    const completedBookings = data?.completedBookings
    console.log(data);

    const { client, invoice, invoiceDialog } = useAppSelector((state) => state.bookings.data)

    const { totalPrice } = useInvoiceData(invoice.items ?? []);

    const onDialogClose = () => {
        dispatch(cleanInvoiceDialog())
    }

    return (
        <div>
            <StatCards />
            <div className="mt-4">
                <Bookings 
                    forCompleted
                    tableTitle='Completed Bookings'
                    data={completedBookings ?? []}
                    loading={isLoading}
                />
                <InvoiceDialog 
                    client={client ?? {}}
                    invoice={invoice}
                    invoiceDialog={invoiceDialog}
                    totalPrice={totalPrice}
                    onDialogClose={onDialogClose}
                />
            </div>
        </div>
    )
}
export default CompletedBookings