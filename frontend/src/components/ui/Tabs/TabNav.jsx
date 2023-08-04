import { forwardRef } from 'react'
import classNames from 'classnames'
import { useTabs } from './context'
import useCallbackRef from '../hooks/useCallbackRef'
import { useConfig } from '../ConfigProvider'

const TabNav = forwardRef((props, ref) => {
    const {
        value: valueProp,
        disabled,
        className,
        icon,
        children,
        ...rest
    } = props

    const { value, onValueChange, variant } = useTabs()
    const isSelected = valueProp === value

    const { themeColor, primaryColorLevel } = useConfig()

    const onTabNavClick = useCallbackRef(() => {
        if (!isSelected && !disabled) {
            onValueChange?.(valueProp)
        }
    })

    const color = `${themeColor}-${primaryColorLevel}`

    const tabNavClass = classNames(
        'tab-nav',
        `tab-nav-${variant}`,
        isSelected &&
            `tab-nav-active text-white`,
        isSelected && variant === 'underline' && `border-${color}`,
        isSelected &&
            variant === 'pill' &&
            `bg-black`,
        disabled && 'tab-nav-disabled',
        !disabled &&
            !isSelected &&
            `hover:text-black hover:bg-gray-300`,
        className
    )

    return (
        <div
            ref={ref}
            className={tabNavClass}
            role="tab"
            aria-selected={isSelected}
            tabIndex={0}
            onClick={onTabNavClick}
            onKeyDown={onTabNavClick}
            {...rest}
        >
            {icon && <div className="tab-nav-icon">{icon}</div>}
            {children}
        </div>
    )
})

TabNav.displayName = 'TabNav'

export default TabNav