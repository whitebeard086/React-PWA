/* eslint-disable react/display-name */
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';

const Image = forwardRef((props) => {

    const {
        placeholderSrc,
        wrapperClassName,
        height,
        width,
        src,
        effect,
        alt,
        className,
    } = props
    return (
        <LazyLoadImage 
            src={src}
            alt={alt}
            placeholderSrc={placeholderSrc}
            height={height}
            width={width}
            effect={effect}
            className={className}
            wrapperClassName={wrapperClassName}
        />
    )
})

Image.defaultProps = {
    width: '100%',
    height: '100%',
    effect: 'blur',
    placeholderSrc: '/img/blurred.jpg'
}

Image.propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string,
    placeholderSrc: PropTypes.string,
    effect: PropTypes.string,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Image