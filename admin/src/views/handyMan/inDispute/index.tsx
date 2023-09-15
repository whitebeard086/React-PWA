import { useGetDisputes } from '../hooks'
import StatCards from '@/views/home/components/feed/StatCards'
import DisputesList from './components/DisputesList'
import { injectReducer } from '@/store'
import reducer, { SLICE_NAME } from './store'

injectReducer(SLICE_NAME, reducer )

const InDispute = () => {
    const { data, isLoading } = useGetDisputes()
    const disputes = data?.disputes
    
    return (
        <div>
            <StatCards />
            <div className="mt-4">
                <DisputesList 
                    data={disputes || []}
                    loading={isLoading}
                />
            </div>
        </div>
    )
}
export default InDispute