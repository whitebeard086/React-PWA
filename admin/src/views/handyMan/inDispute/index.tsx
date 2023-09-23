import { useGetClosedDisputes, useGetDisputes } from '../hooks'
import StatCards from '@/views/home/components/feed/StatCards'
import DisputesList from './components/DisputesList'
import { injectReducer } from '@/store'
import reducer, { SLICE_NAME } from './store'
import InvoiceDialog from './components/InvoiceDialog'
import ClosedDisputes from './components/ClosedDisputes'

injectReducer(SLICE_NAME, reducer )

const InDispute = () => {
    const { data: disputesData, isLoading: disputesLoading } = useGetDisputes()
    const { data: closedDisputesData, isLoading: closedDisputesLoading } = useGetClosedDisputes()
    
    const disputes = disputesData?.disputes
    const closedDisputes = closedDisputesData?.disputes
    
    return (
        <div>
            <StatCards />
            <div className="mt-4 flex flex-col gap-4">
                <DisputesList 
                    data={disputes ?? []}
                    loading={disputesLoading}
                />
                <ClosedDisputes 
                    data={closedDisputes ?? []}
                    loading={closedDisputesLoading}
                />
            </div>
            <InvoiceDialog />
        </div>
    )
}
export default InDispute