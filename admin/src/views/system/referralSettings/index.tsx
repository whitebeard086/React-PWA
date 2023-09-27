import { AnimatedDiv, Button, Card } from '@/components/ui'
import StatCards from '@/views/home/components/feed/StatCards'
import { BiEditAlt } from 'react-icons/bi'
import reducer, { SLICE_NAME } from './store'
import { injectReducer } from '@/store'
import { useGetSystemConfigurations } from '../utils/hooks'
import Settings from './components/settings'

injectReducer(SLICE_NAME, reducer)

const ReferralSettings = () => {
    const { data, isLoading } = useGetSystemConfigurations()
    const systemConfig = data?.systemConfig

    return (
        <div>
            <StatCards />
            <div className="mt-6">
                <h4 className='mb-4'>Referral Settings</h4>

                <div className='grid gap-4 grid-cols-1 lg:grid-cols-2'>
                    <Settings systemConfig={systemConfig ?? {}} />
                </div>
            </div>
        </div>
    )
}
export default ReferralSettings