import { forwardRef } from 'react'
import classNames from 'classnames'
import { useTabs } from './context'

const TabList = forwardRef((props, ref) => {
    const { className, children, ...rest } = props

    const { variant } = useTabs()

    const tabListClass = classNames(
        'tab-list',
        `tab-list-${variant}`,
        className
    )

    return (
        <div ref={ref} role="tablist" className={tabListClass} {...rest}>
            {children}
        </div>
    )
})

TabList.displayName = 'TabList'

export default TabList