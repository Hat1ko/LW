import { combineReducers, applyMiddleware, createStore } from 'redux'
import { authReducer } from './auth/reducers'
import { accountReducer } from './account/reducers'
import { statisticReducer } from './statistic/reducers'
import { documentReducer } from './document/reducers'
import { usersReducer } from './users/reducers'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  statistic: statisticReducer,
  document: documentReducer,
  users: usersReducer,
})

const middleWares = [thunkMiddleware]

const enhancer = composeWithDevTools(applyMiddleware(...middleWares))

const store = createStore(rootReducer, enhancer)

export default store
