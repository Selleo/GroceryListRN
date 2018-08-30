/* @flow */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { Switch } from 'react-native-paper'

import { toggleRtl } from 'src/store/user/actions'

type Props = {
  toggleRtl: Function,
  user: Object,
}

type State = {}

export class App extends Component<Props, State> {
  render() {
    const { toggleRtl, user } = this.props

    return (
      <View style={styles.container}>
        <Switch onValueChange={toggleRtl} value={user.RTL} />
      </View>
    )
  }
}

const mapStateToProps = ({ user }: Object): Object => ({ user })

export default connect(
  mapStateToProps,
  { toggleRtl },
)(App)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
