import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducers'

const composeEnhancer = __DEV__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunkMiddleware)))

export default store

export type ReduxStore = {
  items: Array,
  user: Object<{ RTL: boolean }>,
}
