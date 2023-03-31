

import { combineReducers } from 'redux'
import changeUser from './currentUserReducers'

const rootReducer = combineReducers({
    changeUser
})

export default rootReducer