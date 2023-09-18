import { combineReducers } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import reducers, { DisputesState, SLICE_NAME } from './disputesSlice'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: DisputesState
        }
    }
> = useSelector

export * from './disputesSlice'
export { useAppDispatch } from '@/store'
export default reducer
