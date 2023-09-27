import { CommonProps } from '@/@types/common'
import { motion } from 'framer-motion'

export interface Props extends CommonProps {
    layoutId: string
    duration?: number
}

const MotionedDiv = ({ layoutId, children, duration = 0.3 }: Props) => {
    return (
        <motion.div
            layoutId={layoutId}
            initial={{ opacity: 0, visibility: 'hidden' }}
            animate={{ opacity: 1, visibility: 'visible' }}
            transition={{ duration: duration, type: 'tween' }}
            exit={{ opacity: 0, visibility: 'hidden' }}
        >
            {children}
        </motion.div>
    )
}
export default MotionedDiv