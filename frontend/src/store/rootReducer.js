import { combineReducers } from 'redux'
import auth from './auth'
import payments from '../../src/views/payments/store'
import withdraw from '../../src/views/withdraw/store'
import requests from '../../src/views/requests/store'
import chat from '../../src/views/chat/store'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        auth,
        payments,
        withdraw,
        requests,
        chat,
        ...asyncReducers,
    })

    return combinedReducer(state, action)
}
  
export default rootReducer
