import { toggleValidate } from '@/views/payments/store/stateSlice';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IdleContext } from '../idleContext';

export const useGlobalIdle = () => {
	const isIdle = useContext(IdleContext);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isIdle) {
			dispatch(toggleValidate(false));
		}
	}, [isIdle, dispatch]);
};
