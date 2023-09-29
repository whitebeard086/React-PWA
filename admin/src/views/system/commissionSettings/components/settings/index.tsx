import { SystemConfigurations } from '@/@types/common'
import { AnimatedDiv, Card } from '@/components/ui'
import ServiceCommission from './ServiceCommission'
import AirtimeDiscount from './AirtimeDiscount'
import DataDiscount from './DataDiscount'

type Props = {
    systemConfig: Partial<SystemConfigurations>
}

const Settings = ({ systemConfig }: Props) => {
    return (
        <AnimatedDiv layoutId='commission settings'>
            <Card className='h-full'>
                <div className="flex flex-col gap-4">
                    <ServiceCommission systemConfig={systemConfig} />
                    <AirtimeDiscount systemConfig={systemConfig} />
                    <DataDiscount systemConfig={systemConfig} />
                </div>
            </Card>
        </AnimatedDiv>
    )
}
export default Settings