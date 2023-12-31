import { combineReducers } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import reducers, { HomeIndexState, SLICE_NAME } from './homeSlice'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: HomeIndexState
        }
    }
> = useSelector

export * from './homeSlice'
export { useAppDispatch } from '@/store'
export default reducer
