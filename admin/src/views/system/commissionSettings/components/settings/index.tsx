import { SystemConfigurations } from '@/@types/common'
import { AnimatedDiv, Card } from '@/components/ui'
import ServiceCommission from './ServiceCommission'

type Props = {
    systemConfig: Partial<SystemConfigurations>
}

const Settings = ({ systemConfig }: Props) => {
    return (
        <AnimatedDiv layoutId='commission settings'>
            <Card className='h-full'>
                <div className="flex flex-col gap-4">
                    <ServiceCommission systemConfig={systemConfig} />
                </div>
            </Card>
        </AnimatedDiv>
    )
}
export default Settings