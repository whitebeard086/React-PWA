import { forwardRef } from 'react'
import { TabsContextProvider } from './context'
import useControllableState from '../hooks/useControllableState'
import classNames from 'classnames'


const Tabs = forwardRef((props, ref) => {
    const {
        className,
        defaultValue,
        onChange,
        value: valueProp,
        variant = 'underline',
        ...rest
    } = props

    const [value, setValue] = useControllableState({
        prop: valueProp,
        onChange: onChange,
        defaultProp: defaultValue,
    })

    const tabsClass = classNames('tabs', className)

    return (
        <TabsContextProvider
            value={{
                value: value,
                onValueChange: setValue,
                variant,
            }}
        >
            <div className={tabsClass} {...rest} ref={ref} />
        </TabsContextProvider>
    )
})

Tabs.displayName = 'Tabs'

export default Tabs