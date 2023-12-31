import React, { useState, useMemo, useContext, useCallback, useEffect } from 'react'
import classNames from 'classnames'
import RadioGroupContext from './context'
import { useConfig } from '../ConfigProvider'
import PropTypes from 'prop-types'

const Radio = React.forwardRef((props, ref) => {

	const {
		name: nameContext,
    	disabled: disabledContext,
		value: groupValue,
		onChange: onGroupChange,
		color: colorContext,
		vertical: verticalContext,
		radioGutter
	} = useContext(RadioGroupContext)


	const { 
		children, 
		className,
		checked: checkedProp,
		color,
		customLabelClass,
		defaultChecked,
		disabled = disabledContext,
		field,
		form,
		id, 
		labelRef,
		name = nameContext,
		onChange,
		readOnly,
		value, 
		vertical = verticalContext,
		...rest 
	} = props

	// const { themeColor, primaryColorLevel } = useConfig()
	const themeColor = "primary-500"
	const primaryColorLevel = "600"

	const getChecked = () => {
		return typeof groupValue !== 'undefined' ? groupValue === value : checkedProp
	}

	const [radioChecked, setRadioChecked] = useState(getChecked())


	const radioColor = color || colorContext || `primary-500`

	const controlProps = useMemo(() =>  {
		if(typeof groupValue !== 'undefined') {
			return { checked: radioChecked}
		}
		return { checked: checkedProp, defaultChecked}
	}, [radioChecked, checkedProp, defaultChecked, groupValue])

	const onRadioChange = useCallback((e) => {
		if (disabled || readOnly) {
			return
		}
		if(groupValue) {
			setRadioChecked(e.target.checked)
		}

		onGroupChange?.(value, e)
		onChange?.(value, e)
	}, [disabled, setRadioChecked, onChange, value, onGroupChange, groupValue, readOnly])


	useEffect(() => {
		const propChecked = getChecked()
		if (radioChecked !== propChecked) {
			setRadioChecked(propChecked)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, checkedProp, groupValue])

	const radioDefaultClass = `radio text-primary-500`
	const radioColorClass = disabled && 'disabled'
	const labelDisabledClass = disabled && 'disabled'

	const radioClass = classNames(
		radioDefaultClass,
		radioColorClass
	)
	const labelClass = classNames(
		'radio-label gap-2',
		labelDisabledClass,
		className,
		customLabelClass,
		`${'inline-flex'}`,
		`${radioGutter ? 'm' + (vertical ? 'b-': 'r-') + radioGutter : ''}`
	)

	return (
		<label ref={labelRef} className={labelClass}>
			<input
				id={id}
				ref={ref}
				type="radio"
				className={radioClass}
				disabled={disabled}
				value={value}
				onChange={onRadioChange}
				name={name}
				readOnly={readOnly}
				{...controlProps}
				{...field}
				{...rest}
			/>
			{children ? <span className={classNames('ltr:ml-2 rtl:mr-2', disabled ? 'opacity-50' : '') }>{children}</span> : null}
		</label>
	)
})

Radio.propTypes = {
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	defaultChecked: PropTypes.bool,
	color: PropTypes.string,
	onChange: PropTypes.func,
	labelRef: PropTypes.string,
	customLabelClass: PropTypes.string,
	value: PropTypes.any,
	vertical: PropTypes.bool,
}

export default Radio
