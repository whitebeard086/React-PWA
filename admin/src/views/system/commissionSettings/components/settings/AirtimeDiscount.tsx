import { SystemConfigurations } from '@/@types/common'
import { setAirtimeDiscount, useAppDispatch, useAppSelector } from '../../store'
import { AnimatePresence } from 'framer-motion'
import { Button, MotionedDiv } from '@/components/ui'
import { BiEditAlt } from 'react-icons/bi'
import EditAirtimeDiscount from './EditAirtimeDiscount'

type Props = {
    systemConfig: Partial<SystemConfigurations>
}

const AirtimeDiscount = ({ systemConfig }: Props) => {
    const dispatch = useAppDispatch()

    const { airtimeDiscount } = useAppSelector((state) => state.commissionSettings.data)

    const onEditAirtimeDiscount = () => dispatch(setAirtimeDiscount(true))

    return (
        <AnimatePresence>
            {airtimeDiscount ? (
                <MotionedDiv layoutId='edit airtime discount'>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-base">
                            Airtime Discount
                        </h4>
                        <EditAirtimeDiscount systemConfig={systemConfig} />
                    </div>
                </MotionedDiv>
            ):(
                <MotionedDiv layoutId='initial airtime discount' duration={0.1}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h4 className="text-base">
                                Airtime Discount
                            </h4>
                            <Button 
                                size='xs'
                                variant='twoTone'
                                icon={<BiEditAlt />}
                                onClick={onEditAirtimeDiscount}
                            />
                        </div>
                        <p className="font-semibold">{systemConfig.airtime_discount}%</p>
                    </div>
                </MotionedDiv>
            )}
        </AnimatePresence>
    )
}
export default AirtimeDiscount