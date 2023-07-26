import { combineReducers } from 'redux'
import auth from './auth'
import payments from '../../src/views/payments/store'
import requests from '../../src/views/requests/store'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        auth,
        payments,
        // requests,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
