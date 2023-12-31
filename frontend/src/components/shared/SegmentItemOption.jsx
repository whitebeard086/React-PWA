import classNames from 'classnames';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { HiCheckCircle } from 'react-icons/hi';

const SegmentItemOption = forwardRef((props, ref) => {
	const {
		active,
		children,
		className,
		customCheck,
		defaultGutter,
		disabled,
		hoverable,
		onSegmentItemClick,
		variant,
	} = props;

	return (
		<div
			ref={ref}
			className={classNames(
				'flex justify-center',
				variant !== 'plain' && !customCheck && 'justify-between',
				'items-center',
				'border',
				'rounded-md ',
				'border-gray-200 dark:border-gray-600',
				defaultGutter && 'p-3',
				'cursor-pointer',
				'select-none',
				'w-100',
				active && 'ring-1 border-emerald-500 ring-emerald-500',
				hoverable &&
					`hover:ring-1 hover:ring-emerald-500 hover:border-emerald-500`,
				disabled && 'opacity-50 cursor-not-allowed',
				className
			)}
			onClick={onSegmentItemClick}
		>
			{children}
			{variant !== 'plain' && active && !customCheck && (
				<HiCheckCircle className="text-2xl text-emerald-500" />
			)}
			{variant !== 'plain' && active && customCheck}
		</div>
	);
});

SegmentItemOption.propTypes = {
	active: PropTypes.bool,
	disabled: PropTypes.bool,
	hoverable: PropTypes.bool,
	defaultGutter: PropTypes.bool,
	customCheck: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	variant: PropTypes.string,
};

SegmentItemOption.defaultProps = {
	defaultGutter: true,
	variant: 'default',
};

export default SegmentItemOption;
