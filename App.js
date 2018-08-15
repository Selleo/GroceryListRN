/* @flow */

import * as React from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import App from './src'

// TODO: Customize colors for app
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
}

const AppContainer = () => (
  <PaperProvider theme={theme}>
    <App />
  </PaperProvider>
)

export default AppContainer
