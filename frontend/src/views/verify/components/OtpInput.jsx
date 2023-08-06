/* eslint-disable react/display-name */
import React from "react";
import PropTypes from 'prop-types'
import { useForm } from "@/components/ui/Form/context";
import { useInputGroup } from "@/components/ui/InputGroup/context";
import { useConfig } from "@/components/ui";
import { CONTROL_SIZES, SIZES } from "@/components/ui/utils/constant";


const OtpInput = React.forwardRef((props, ref) => {
    const {
        asElement: Component,
        size,
        inputSize,
        validationPattern = /[0-9]{1}/,
        value,
        onChange,
        className,
        ...restProps
    } = props;

    const { themeColor, controlSize, primaryColorLevel, direction } = useConfig()
    const formControlSize = useForm()?.size
	const inputGroupSize = useInputGroup()?.size
    const formInputSize = inputSize || inputGroupSize ||  formControlSize || controlSize 

    const arr = new Array(size).fill("-");

    const handleInputChange = (e, index) => {
        const elem = e.target;
        const val = e.target.value;

        if (!validationPattern.test(val) && val !== "") return;

        const valueArr = value.split("");
        valueArr[index] = val;
        const newVal = valueArr.join("").slice(0, 6);
        onChange(newVal);

        if (val) {
            const next = elem.nextElementSibling || null;
            next?.focus();
        }
    }

    const handleKeyUp = (e) => {
        const current = e.currentTarget;

        if (e.key === "ArrowLeft" || e.key === "Backspace") {
            const prev = current.previousElementSibling || null;
            prev?.focus();
            prev?.setSelectionRange(0, 1)
            return;
        }

        if (e.key === "ArrowRight") {
            const prev = current.nextSibling || null;
            prev?.focus();
            prev?.setSelectionRange(0, 1)
            return;
        }
    }

    const handlePaste = (e) => {
        e.preventDefault();
        const val = e.clipboardData.getData("text").substring(0, size);
        onChange(val);
    }

    return (
        <div className="flex gap-2">
            {arr.map((_, index) => {
                return (
                    <input 
                        key={index}
                        {...restProps}
                        className={className || `input focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel} px-0 text-center input-${formInputSize} h-${CONTROL_SIZES[formInputSize]}`}
                        type="text" 
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern={validationPattern.source}
                        onInvalid={e => e.target.setCustomValidity('Please enter a number.')}
                        maxLength={size}
                        value={value.at(index) ?? ""}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyUp={handleKeyUp}
                        onPaste={handlePaste}
                    />
                )
            })}
        </div>
    )
})

OtpInput.propTypes = {
	asElement: PropTypes.string,
	type: PropTypes.string,
	className: PropTypes.string,
	size: PropTypes.oneOf([4, 6, 8]),
    inputSize: PropTypes.oneOf([SIZES.LG, SIZES.SM, SIZES.MD]),
	value: PropTypes.any,
}

OtpInput.defaultProps = {
	type: 'text',
	asElement: 'input',
	className: '',
}

export default OtpInput