import { SystemConfigurations } from '@/@types/common'
import { AnimatePresence } from 'framer-motion'
import { setEditBonus, useAppDispatch, useAppSelector } from '../../store'
import { Button, MotionedDiv } from '@/components/ui'
import { BiEditAlt } from 'react-icons/bi'
import EditBonus from './EditBonus'

type Props = {
    systemConfig: Partial<SystemConfigurations>
}

const ReferralBonus = ({ systemConfig }: Props) => {
    const dispatch = useAppDispatch()

    const { editBonus } = useAppSelector((state) => state.referralSettings.data)

    const onEditBonus = () => dispatch(setEditBonus(true))

    return (
        <AnimatePresence>
            {editBonus ? (
                <MotionedDiv layoutId='editing'>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-base">
                                Referral Bonus 
                        </h4>
                        <EditBonus systemConfig={systemConfig} />
                    </div>
                </MotionedDiv>
            ):(
                <MotionedDiv layoutId='initial' duration={0.1}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h4 className="text-base">
                                Referral Bonus 
                            </h4>
                            <Button 
                                size='xs'
                                variant='twoTone'
                                icon={<BiEditAlt />}
                                onClick={onEditBonus}
                            />
                        </div>
                        <p className='font-semibold'>₦{systemConfig.referral_bonus?.toLocaleString()}</p>
                    </div>
                </MotionedDiv>
            )}
        </AnimatePresence>
    )
}
export default ReferralBonus