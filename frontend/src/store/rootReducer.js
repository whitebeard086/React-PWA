import { combineReducers } from 'redux'
import auth from './auth'
import payments from '../../src/views/payments/store'
import chat from '../../src/views/chat/store'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        auth,
        payments,
        chat,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
