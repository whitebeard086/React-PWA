import { injectReducer } from '@/store'
import reducer, { SLICE_NAME } from './store'
import { useGetSystemConfigurations } from '../utils/hooks'
import StatCards from '@/views/home/components/feed/StatCards'
import Settings from './components/settings'

injectReducer(SLICE_NAME, reducer)

const CommissionSettings = () => {
    const { data, isLoading } = useGetSystemConfigurations()
    const systemConfig = data?.systemConfig

    return (
        <div>
            <StatCards />
            <div className="mt-6">
                <h4 className='mb-4'>Commission Settings</h4>

                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <Settings systemConfig={systemConfig ?? {}} />
                </div>
            </div>
        </div>
    )
}
export default CommissionSettings