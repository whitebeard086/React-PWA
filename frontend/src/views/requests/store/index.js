import { combineReducers } from '@reduxjs/toolkit'
import state from './stateSlice'
import data from './dataSlice'
import { useSelector } from 'react-redux';

const reducer = combineReducers({
    state,
    data
})

export const useAppSelector = useSelector;

export { useAppDispatch } from '@/store';
export * from './dataSlice';
export * from './hooks';
export * from './stateSlice';
export default reducer