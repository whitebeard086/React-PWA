import { combineReducers } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import data from './dataSlice';
import state from './stateSlice';

const reducer = combineReducers({
	state,
	data,
});

export const useAppSelector = useSelector;

export { useAppDispatch } from '@/store';
export * from './dataSlice';
export * from './hooks';
export * from './stateSlice';
export default reducer;
