import { combineReducers } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import data from './dataSlice';
import state from './stateSlice';

const reducer = combineReducers({
	state,
	data,
});

export const useAppSelector = useSelector;
export const SLICE_NAME = 'airtime';
export { useAppDispatch } from '@/store';
export * from './dataSlice';
export default reducer;
