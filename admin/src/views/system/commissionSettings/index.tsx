import { injectReducer } from '@/store'
import reducer, { SLICE_NAME } from './store'
import { useGetSystemConfigurations } from '../utils/hooks'
import StatCards from '@/views/home/components/feed/StatCards'
import Settings from './components/settings'
import RecentCommissions from './components/commissions/RecentCommissions'
import Commissions from './components/commissions/Commissions'
import GettingData from './components/GettingData'
import { useGetSystemCommissions } from '@/views/finance/utils/hooks'

injectReducer(SLICE_NAME, reducer)

const CommissionSettings = () => {
    const { data, isLoading } = useGetSystemConfigurations()
    const { data: commissionData, isLoading: loadingCommissions } = useGetSystemCommissions()
    const systemConfig = data?.systemConfig
    const commissions = commissionData?.serviceCommissions

    return (
        <div>
            <StatCards />
            <div className="mt-6">
                <h4 className='mb-4'>Commission Settings</h4>

                {isLoading ? (
                    <GettingData />
                ):(
                    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                        <Settings systemConfig={systemConfig ?? {}} />
                        <RecentCommissions data={data ?? {}} />
                    </div>
                )}

                <h4 className='mb-4 mt-4'>Commissions</h4>
                <div>
                    <Commissions 
                        commissions={commissions ?? []}
                        loading={loadingCommissions}
                    />
                </div>
            </div>
        </div>
    )
}
export default CommissionSettings