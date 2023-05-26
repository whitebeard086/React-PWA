import { forwardRef } from "react";
import PropTypes from 'prop-types'
import { CgSpinner } from 'react-icons/cg'
import { enable } from "workbox-navigation-preload";
import classNames from "classnames";

const Spinner = forwardRef((props, ref) => {

    const { 
        className, 
        color,
        enableTheme, 
        indicator: Component, 
        isSpining, 
        size, 
        style,
        ...rest 
    } = props

    const spinnerColor = color || (enableTheme && `primary-500`)

    const spinnerStyle = {
        height: size,
        width: size,
        ...style
    }

    const spinnerClass = classNames(
        isSpining && 'animate-spin',
        spinnerColor && `text-${spinnerColor}`, 
        className
    )

    return (
        <Component ref={ref} style={spinnerStyle} className={spinnerClass} {...rest} />
    )

})

Spinner.defaultProps = {
    indicator: CgSpinner,
    isSpining: true,
    size: 20,
    enableTheme: true
}

Spinner.propTypes = {
	size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    color: PropTypes.string,
    indicator: PropTypes.elementType,
    isSpining: PropTypes.bool,
    enableTheme: PropTypes.bool,
}

export default Spinner