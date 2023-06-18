import React from 'react'
import { Button } from 'components/ui'
import { VscEllipsis } from 'react-icons/vsc'

const EllipsisButton = props => {

	const  { shape = 'circle', variant = 'plain', size ='xs', icon  } = props

	return (
		<Button
			shape={shape}
			variant={variant}
			size={size}
			icon={icon || <VscEllipsis />} 
			{...props}
		/>
	)
}

export default EllipsisButton
