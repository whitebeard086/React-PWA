import StatCards from '@/views/home/components/feed/StatCards'
import reducer, { SLICE_NAME } from './store'
import { injectReducer } from '@/store'
import { useGetSystemConfigurations } from '../utils/hooks'
import Settings from './components/settings'
import LatestReferrals from './components/referrals/LatestReferrals'
import Referrals from './components/referrals/Referrals'

injectReducer(SLICE_NAME, reducer)

const ReferralSettings = () => {
    const { data, isLoading } = useGetSystemConfigurations()
    const systemConfig = data?.systemConfig
    const referrals = data?.referrals

    return (
        <div>
            <StatCards />
            <div className="mt-6">
                <h4 className='mb-4'>Referral Settings</h4>

                <div className='grid gap-4 grid-cols-1 lg:grid-cols-2'>
                    <Settings systemConfig={systemConfig ?? {}} />
                    <LatestReferrals data={data ?? {}} />
                </div>

                <h4 className='mb-4 mt-4'>Referrals</h4>
                <div>
                    <Referrals 
                        referrals={referrals ?? []}
                        loading={isLoading}
                    />
                </div>
            </div>
        </div>
    )
}
export default ReferralSettings