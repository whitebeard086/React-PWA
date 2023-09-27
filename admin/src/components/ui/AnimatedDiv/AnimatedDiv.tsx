import { CommonProps } from '@/@types/common'
import { AnimatePresence, motion } from 'framer-motion'

export interface Props extends CommonProps {
    layoutId: string
}

const AnimatedDiv = ({ layoutId, children }: Props) => {
    return (
        <AnimatePresence>
            <motion.div
                layoutId={layoutId}
                initial={{ opacity: 0, visibility: 'hidden' }}
                animate={{ opacity: 1, visibility: 'visible' }}
                transition={{ duration: 0.3, type: 'tween' }}
                exit={{ opacity: 0, visibility: 'hidden' }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
export default AnimatedDiv