/* @flow */

import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FlatList, RectButton } from 'react-native-gesture-handler'

import SwipeableRow from './components/SwipeableRow'
import { gray, white, transparent } from './styles/variables'

type Props = {
  items: Array<Object>,
}

type State = {
  items: Array<Object>,
}

export default class App extends Component<Props, State> {
  state = {
    items: this.props.items,
  }

  _removeItem = id => {
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id),
    }))
  }

  _renderItem = ({ item }) => (
    <SwipeableRow removeItem={() => this._removeItem(item.id)}>
      <RectButton style={styles.rectButton}>
        <Text numberOfLines={2} style={styles.text}>
          {item.name}
        </Text>
      </RectButton>
    </SwipeableRow>
  )

  render() {
    return (
      <FlatList
        data={this.state.items}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={({ id }) => id}
        renderItem={this._renderItem}
      />
    )
  }
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: gray,
    height: StyleSheet.hairlineWidth,
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: white,
  },
  text: {
    fontWeight: 'bold',
    backgroundColor: transparent,
  },
})
