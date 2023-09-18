import { injectReducer } from '@/store'
import reducer, { SLICE_NAME, useAppSelector, useAppDispatch, cleanInvoiceDialog } from './store'
import { useGetActiveBookings, useInvoiceData } from '../hooks'
import StatCards from '@/views/home/components/feed/StatCards'
import Bookings from './components/Bookings'
import InvoiceDialog from './components/InvoiceDialog'

injectReducer(SLICE_NAME, reducer )

const ActiveBookings = () => {
    const dispatch = useAppDispatch()
    const { data, isLoading } = useGetActiveBookings()
    const activeBookings = data?.activeBookings

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
                    tableTitle='Active Bookings'
                    data={activeBookings ?? []}
                    loading={isLoading}
                />
            </div>
            <InvoiceDialog 
                client={client ?? {}}
                invoice={invoice}
                invoiceDialog={invoiceDialog}
                totalPrice={totalPrice}
                onDialogClose={onDialogClose}
            />
        </div>
    )
}
export default ActiveBookings