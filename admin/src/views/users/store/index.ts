import { combineReducers } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import reducers, { SLICE_NAME, UsersIndexState } from './usersSlice'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: { data: UsersIndexState }
    }
> = useSelector

export * from './usersSlice'
export { useAppDispatch } from '@/store'
export default reducer