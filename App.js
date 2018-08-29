/* @flow */

import React, { Component } from 'react'
import { Linking } from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { connect } from 'react-redux'

import App from './src'
import { setItems } from './src/store/items/actions'

// TODO: Customize colors for app
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
}

type Props = {
  setItems: Function,
}

class AppContainer extends Component<Props> {
  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL)

    Linking.getInitialURL().then(url => {
      if (url) {
        this.handleOpenURL({ url })
      }
    })
  }

  componentWillUnmount() {
    Linking.removeAllListeners()
  }

  handleOpenURL = ({ url }) => {
    const [, queryString] = url.match(/items=([^#]+)/)
    const items = queryString.split(';').map(i => {
      const [name, id] = i.split(':')
      return { name, id }
    })

    this.props.setItems(items)
  }

  render() {
    return (
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    )
  }
}

export default connect(
  null,
  { setItems },
)(AppContainer)
