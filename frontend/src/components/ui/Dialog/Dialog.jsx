/* eslint-disable react/prop-types */
import classNames from 'classnames';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';
import { theme } from 'twin.macro';
import CloseButton from '../CloseButton';
import useWindowSize from '../hooks/useWindowSize';

const Dialog = (props) => {
	const currentSize = useWindowSize();

	const {
		children,
		className,
		closable,
		width,
		height,
		style,
		isOpen,
		onClose,
		scrollable,
		bodyOpenClassName,
		portalClassName,
		overlayClassName,
		contentClassName,
		closeTimeoutMS,
		...rest
	} = props;

	const onCloseClick = (e) => {
		onClose(e);
	};

	const renderCloseButton = (
		<CloseButton
			onClick={onCloseClick}
			className="right-6"
			absolute
		/>
	);

	const contentStyle = {
		content: {
			inset: 'unset',
		},
		...style,
	};

	if (width !== undefined) {
		contentStyle.content.width = width;

		if (
			currentSize.width <=
			parseInt(theme`screens.sm`.split(/ /)[0].replace(/[^\d]/g, ''))
		) {
			contentStyle.content.width = 'auto';
		}
	}
	if (height !== undefined) {
		contentStyle.content.height = height;
	}

	const defaultDialogContentClass = 'dialog-content';

	const dialogClass = classNames(defaultDialogContentClass, contentClassName);

	return (
		<Modal
			className={{
				base: classNames('dialog', className),
				afterOpen: 'dialog-after-open',
				beforeClose: 'dialog-before-close',
			}}
			overlayClassName={{
				base: classNames('dialog-overlay', overlayClassName),
				afterOpen: classNames('dialog-overlay-after-open', scrollable && 'overflow-y-auto'),
				beforeClose: 'dialog-overlay-before-close',
			}}
			portalClassName={classNames('dialog-portal', portalClassName)}
			bodyOpenClassName={classNames('dialog-open', bodyOpenClassName)}
			ariaHideApp={false}
			isOpen={isOpen}
			style={{ ...contentStyle }}
			closeTimeoutMS={closeTimeoutMS}
			{...rest}
		>
			<motion.div
				className={classNames(dialogClass, 'overflow-y-auto')}
				initial={{ transform: 'scale(0.9)' }}
				animate={{
					transform: isOpen ? 'scale(1)' : 'scale(0.9)',
				}}
			>
				{closable && renderCloseButton}
				{children}
			</motion.div>
		</Modal>
	);
};

Dialog.propTypes = {
	closable: PropTypes.bool,
	scrollable: PropTypes.bool,
	isOpen: PropTypes.bool.isRequired,
	overlayClassName: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onClose: PropTypes.func,
	portalClassName: PropTypes.string,
	contentClassName: PropTypes.string,
	closeTimeoutMS: PropTypes.number,
	bodyOpenClassName: PropTypes.string,
};

Dialog.defaultProps = {
	scrollable: false,
	closable: true,
	width: 520,
	closeTimeoutMS: 150,
};

export default Dialog;
