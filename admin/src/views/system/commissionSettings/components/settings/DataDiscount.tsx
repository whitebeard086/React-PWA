import { SystemConfigurations } from '@/@types/common'
import { setDataDiscount, useAppDispatch, useAppSelector } from '../../store'
import { AnimatePresence } from 'framer-motion'
import { Button, MotionedDiv } from '@/components/ui'
import { BiEditAlt } from 'react-icons/bi'
import EditDataDiscount from './EditDataDiscount'

type Props = {
    systemConfig: Partial<SystemConfigurations>
}

const DataDiscount = ({ systemConfig }: Props) => {
    const dispatch = useAppDispatch()

    const { dataDiscount } = useAppSelector((state) => state.commissionSettings.data)

    const onEditDataDiscount = () => dispatch(setDataDiscount(true))

    return (
        <AnimatePresence>
            {dataDiscount ? (
                <MotionedDiv layoutId='edit data discount'>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-base">
                            Data Discount
                        </h4>
                        <EditDataDiscount systemConfig={systemConfig} />
                    </div>
                </MotionedDiv>
            ):(
                <MotionedDiv layoutId='initial data discount' duration={0.1}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h4 className="text-base">
                                Data Discount
                            </h4>
                            <Button 
                                size='xs'
                                variant='twoTone'
                                icon={<BiEditAlt />}
                                onClick={onEditDataDiscount}
                            />
                        </div>
                        <p className="font-semibold">{systemConfig.data_discount}%</p>
                    </div>
                </MotionedDiv>
            )}
        </AnimatePresence>
    )
}
export default DataDiscount