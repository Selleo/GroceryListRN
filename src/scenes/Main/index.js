/* @flow */

import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { FlatList, RectButton, TextInput } from 'react-native-gesture-handler'

import SwipeableRow from '../../components/SwipeableRow'
import { gray, white, transparent } from '../../styles/colors'

import ITEMS from '../../../fixtures/items'

type Props = {}
type State = {
  items: Array<Object>,
  editedItemId: ?string,
  name: ?string,
}

export default class App extends Component<Props, State> {
  state = {
    items: ITEMS,
    editedItemId: null,
    name: null,
  }

  _handleChange = (name): void => this.setState({ name })
  _handleEdit = () => {
    const { editedItemId, name } = this.state

    this.setState(prevState => ({
      items: prevState.items.map(item => (item.id === editedItemId ? { id: item.id, name } : item)),
      editedItemId: null,
    }))
  }

  _editItem = (editedItemId): void => this.setState({ editedItemId })
  _removeItem = (id): void =>
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id),
    }))

  _renderItem = ({ item: { id, name } }) => (
    <SwipeableRow editItem={() => this._editItem(id)} removeItem={() => this._removeItem(id)}>
      <RectButton style={styles.rectButton}>
        {id === this.state.editedItemId ? (
          <TextInput
            autoFocus={true}
            onBlur={this._handleEdit}
            onChangeText={this._handleChange}
            onSubmitEditing={this._handleEdit}
            value={name}
          />
        ) : (
          <Text numberOfLines={2} style={styles.text}>
            {name}
          </Text>
        )}
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
