import classNames from 'classnames'
import { HTMLProps } from 'react'

type Props = HTMLProps<HTMLAnchorElement> & { active?: boolean }

export default function PageLink({
    className,
    children,
    disabled,
    active,
    ...props
}: Props) {
    const customClassName = classNames('page-link', className, {
        active,
        disabled,
    })

    if (disabled) {
        return <span className={customClassName}>{children}</span>
    }

    return (
        <a
            {...props}
            className={customClassName}
            aria-current={active ? 'page' : undefined}
        >
            {children}
        </a>
    )
}
