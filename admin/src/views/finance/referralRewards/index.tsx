import StatCards from '@/views/home/components/feed/StatCards'
import Referrals from './components/Referrals'
import { useGetReferralRewards } from '../utils/hooks'

const ReferralRewards = () => {
    const { data, isLoading } = useGetReferralRewards()
    const referrals = data?.referrals
    return (
        <div>
            <StatCards />
            <div className="mt-6">
                <h4 className="mb-4">Referral Rewards</h4>
                <Referrals 
                    data={referrals ?? []}
                    loading={isLoading}
                />
            </div>
        </div>
    )
}
export default ReferralRewards