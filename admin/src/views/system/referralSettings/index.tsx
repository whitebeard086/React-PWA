import StatCards from '@/views/home/components/feed/StatCards'
import reducer, { SLICE_NAME } from './store'
import { injectReducer } from '@/store'
import { useGetSystemConfigurations } from '../utils/hooks'
import Settings from './components/settings'
import LatestReferrals from './components/referrals/LatestReferrals'
import Referrals from './components/referrals/Referrals'
import GettingData from './components/GettingData'
import { useGetReferralRewards } from '@/views/finance/utils/hooks'

injectReducer(SLICE_NAME, reducer)

const ReferralSettings = () => {
    const { data, isLoading } = useGetSystemConfigurations()
    const { data: referralsData, isLoading: loadingReferrals } = useGetReferralRewards()
    const systemConfig = data?.systemConfig
    const referrals = referralsData?.referrals

    return (
        <div>
            <StatCards />
            <div className="mt-6">
                <h4 className='mb-4'>Referral Settings</h4>

                {isLoading ? (
                    <GettingData />
                ):(
                    <div className='grid gap-4 grid-cols-1 lg:grid-cols-2'>
                        <Settings systemConfig={systemConfig ?? {}} />
                        <LatestReferrals data={data ?? {}} />
                    </div>
                )}

                <h4 className='mb-4 mt-4'>Referrals</h4>
                <div>
                    <Referrals 
                        referrals={referrals ?? []}
                        loading={loadingReferrals}
                    />
                </div>
            </div>
        </div>
    )
}
export default ReferralSettings