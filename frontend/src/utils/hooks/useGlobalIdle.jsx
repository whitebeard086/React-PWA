import { toggleValidate } from '@/views/payments/store/stateSlice';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IdleContext } from '../idleContext';

export const useGlobalIdle = () => {
	const isIdle = useContext(IdleContext);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isIdle) {
			// trigger pin validation
			// alert('You are idle');
			dispatch(toggleValidate(true));
		}
	}, [isIdle, dispatch]);
};
