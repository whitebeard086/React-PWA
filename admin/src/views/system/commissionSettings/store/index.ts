import { combineReducers } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import reducers, { CommissionSettingsState, SLICE_NAME } from './commissionSettingsSlice'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: CommissionSettingsState
        }
    }
> = useSelector

export * from './commissionSettingsSlice'
export { useAppDispatch } from '@/store'
export default reducer
