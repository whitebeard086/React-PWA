import { combineReducers } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import reducers, { enquiriesState, SLICE_NAME } from './enquiriesSlice'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: enquiriesState
        }
    }
> = useSelector

export * from './enquiriesSlice'
export { useAppDispatch } from '@/store'
export default reducer