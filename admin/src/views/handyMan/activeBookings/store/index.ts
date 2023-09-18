import { combineReducers } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import reducers, { bookingsState, SLICE_NAME } from './bookingsSlice'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: bookingsState
        }
    }
> = useSelector

export * from './bookingsSlice'
export { useAppDispatch } from '@/store'
export default reducer