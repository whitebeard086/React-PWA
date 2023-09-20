/* eslint-disable react/display-name */
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { CommonProps } from '../@types/common';
import { ComponentPropsWithoutRef } from 'react-markdown/lib/ast-to-react';

export interface ImageProps
    extends CommonProps,
        Omit<ComponentPropsWithoutRef<'div'>, 'onClick'> {
    height?: string | number
    placeholderSrc?: string
    width?: string | number
    src?: string
    wrapperClassName?: string
    effect?: string
    alt?: string
    className?: string
}

const Image = forwardRef<HTMLDivElement, ImageProps>((props, ref) => {

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

export default Image