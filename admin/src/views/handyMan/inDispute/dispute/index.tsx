import { injectReducer } from '@/store'
import reducer, { SLICE_NAME } from '../store'
import { useGetDispute } from '../../hooks'
import { useLocation } from 'react-router-dom'
import { Loading } from '@/components/shared'
import Chat from './components/Chat'
import Details from './components/Details'

injectReducer(SLICE_NAME, reducer )

const Dispute = () => {
    const { pathname } = useLocation()
    const UID = pathname.split('/')[3]
    const { data, isLoading } = useGetDispute({ uid: UID })
    const dispute = data?.dispute

    return (
        <Loading loading={isLoading}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Details 
                    dispute={dispute || {}}  
                    className="lg:hidden"
                />
                <Chat 
                    dispute={dispute || {}}  
                    className="col-span-2"
                />
                <Details 
                    dispute={dispute || {}}  
                    className="hidden lg:block"
                />
            </div>
        </Loading>
    )
}
export default Dispute