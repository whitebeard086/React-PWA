import { combineReducers } from 'redux'
import auth from './auth'
import payments from '../../src/views/payments/store'
import withdraw from '../../src/views/withdraw/store'
import chat from '../../src/views/chat/store'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        auth,
        payments,
        withdraw,
        chat,
        ...asyncReducers,
    })

    return combinedReducer(state, action)
}
  
export default rootReducer
