import { SystemConfigurations } from '@/@types/common'
import { Button, MotionedDiv } from '@/components/ui'
import { BiEditAlt } from 'react-icons/bi'
import { setEditPitch, useAppDispatch, useAppSelector } from '../../store'
import { AnimatePresence } from 'framer-motion'
import ReactHtmlParser from 'html-react-parser'
import EditPitch from './EditPitch'

type Props = {
    systemConfig: Partial<SystemConfigurations>
}

const ReferralPitch = ({ systemConfig }: Props) => {
    const dispatch = useAppDispatch()

    const { editPitch } = useAppSelector((state) => state.referralSettings.data)

    const onEditPitch = () => dispatch(setEditPitch(true))

    return (
        <AnimatePresence>
            {editPitch ? (
                <MotionedDiv layoutId='editing pitch'>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-base">
                            Referral Pitch 
                        </h4>
                        <EditPitch systemConfig={systemConfig} />
                    </div>
                </MotionedDiv>
            ):(
                <MotionedDiv layoutId='initial pitch' duration={0.1}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h4 className="text-base">
                                Referral Pitch 
                            </h4>
                            <Button 
                                size='xs'
                                variant='twoTone'
                                icon={<BiEditAlt />}
                                onClick={onEditPitch}
                            />
                        </div>
                        <div className="max-w-[350px]">
                            {ReactHtmlParser(systemConfig.referral_pitch ?? '')}
                        </div>
                    </div>
                </MotionedDiv>
            )}
        </AnimatePresence>
    )
}
export default ReferralPitch