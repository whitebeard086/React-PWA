import { SystemConfigurations } from '@/@types/common'
import { AnimatedDiv, Button, Card } from '@/components/ui'
import { BiEditAlt } from 'react-icons/bi'
import ReferralBonus from './ReferralBonus'
import ReferralPitch from './ReferralPitch'

type Props = {
    systemConfig: Partial<SystemConfigurations>
}

const Settings = ({ systemConfig }: Props) => {
    return (
        <AnimatedDiv layoutId='referral settings'>
            <Card>
                <div className='flex flex-col gap-4'>
                    <ReferralBonus systemConfig={systemConfig} />

                    <ReferralPitch systemConfig={systemConfig} />
                </div>
            </Card>
        </AnimatedDiv>
    )
}
export default Settings