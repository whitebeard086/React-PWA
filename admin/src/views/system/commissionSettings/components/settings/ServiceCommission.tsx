import { SystemConfigurations } from '@/@types/common'
import { setCommission, useAppDispatch, useAppSelector } from '../../store'
import { AnimatePresence } from 'framer-motion'
import { Button, MotionedDiv } from '@/components/ui'
import { BiEditAlt } from 'react-icons/bi'
import EditCommission from './EditCommission'

type Props = {
    systemConfig: Partial<SystemConfigurations>
}

const ServiceCommission = ({ systemConfig }: Props) => {
    const dispatch = useAppDispatch()

    const { commission } = useAppSelector((state) => state.commissionSettings.data)

    const onEditCommission = () => dispatch(setCommission(true))

    return (
        <AnimatePresence>
            {commission ? (
                <MotionedDiv layoutId='edit commission'>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-base">
                            Service Commission
                        </h4>
                        <EditCommission systemConfig={systemConfig} />
                    </div>
                </MotionedDiv>
            ):(
                <MotionedDiv layoutId='initial commission' duration={0.1}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h4 className="text-base">
                                Service Commission
                            </h4>
                            <Button 
                                size='xs'
                                variant='twoTone'
                                icon={<BiEditAlt />}
                                onClick={onEditCommission}
                            />
                        </div>
                        <p className="font-semibold">{systemConfig.service_commission}%</p>
                    </div>
                </MotionedDiv>
            )}
        </AnimatePresence>
    )
}
export default ServiceCommission