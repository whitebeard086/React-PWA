import { combineReducers } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import reducers, { ReferralSettingsState, SLICE_NAME } from './referralSettingsSlice'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: ReferralSettingsState
        }
    }
> = useSelector

export * from './referralSettingsSlice'
export { useAppDispatch } from '@/store'
export default reducer
