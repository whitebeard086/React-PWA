import { combineReducers } from 'redux'
import auth from './auth'
import payments from '../../src/views/payments/store'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        auth,
        payments,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
