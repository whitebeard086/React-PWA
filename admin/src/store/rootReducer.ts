import { combineReducers, CombinedState, AnyAction, Reducer } from 'redux'
import auth, { AuthState } from './slices/auth'
import base, { BaseState } from './slices/base'
import theme, { ThemeState } from './slices/theme/themeSlice'
import RtkQueryService from '@/services/RtkQueryService'
import home, { HomeIndexState } from '@/views/home/store'
import disputes, { DisputesState } from '@/views/handyMan/inDispute/store'
import commissionSettings, { CommissionSettingsState } from '@/views/system/commissionSettings/store'
import referralSettings, { ReferralSettingsState } from '@/views/system/referralSettings/store'
import locale, { LocaleState } from './slices/locale/localeSlice'

export type RootState = CombinedState<{
    auth: CombinedState<AuthState>
    base: CombinedState<BaseState>
    locale: LocaleState
    theme: ThemeState
    home: HomeIndexState
    disputes: DisputesState
    commissionSettings: CommissionSettingsState
    referralSettings: ReferralSettingsState

    /* eslint-disable @typescript-eslint/no-explicit-any */
    [RtkQueryService.reducerPath]: any
}>

export interface AsyncReducers {
    [key: string]: Reducer<any, AnyAction>
}

const staticReducers = {
    auth,
    base,
    theme,
    locale,
    home,
    disputes,
    commissionSettings,
    referralSettings,
    [RtkQueryService.reducerPath]: RtkQueryService.reducer,
}

const rootReducer =
    (asyncReducers?: AsyncReducers) =>
    (state: RootState, action: AnyAction) => {
        const combinedReducer = combineReducers({
            ...staticReducers,
            ...asyncReducers,
        })
        return combinedReducer(state, action)
    }

export default rootReducer
