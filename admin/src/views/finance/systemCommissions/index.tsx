import StatCards from '@/views/home/components/feed/StatCards'
import { useGetSystemCommissions } from '../utils/hooks'
import ServiceCommissions from './components/ServiceCommissions'

const SystemCommissions = () => {
    const { data, isLoading } = useGetSystemCommissions()
    const serviceCommissions = data?.serviceCommissions

    return (
        <div>
            <StatCards />
            <div className="mt-6">
                <h4 className="mb-4">System Commissions</h4>
                <ServiceCommissions 
                    data={serviceCommissions ?? []}
                    loading={isLoading}
                /> 
            </div>
        </div>
    )
}
export default SystemCommissions