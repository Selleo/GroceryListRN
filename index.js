import * as React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import App from './App'
import { name as appName } from './app.json'
import store from 'src/store/'

const Main = (): React.Element => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => Main)
