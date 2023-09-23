import { combineReducers } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import reducers, { CategoryState, SLICE_NAME } from './categorySlice'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: CategoryState
        }
    }
> = useSelector

export * from './categorySlice'
export { useAppDispatch } from '@/store'
export default reducer
