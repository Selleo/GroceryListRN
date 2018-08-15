/* @flow */

import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import DraggableFlatList from 'react-native-draggable-flatlist'

import ITEMS from '../../../fixtures/items'
import { gray } from '../../styles/colors'
import SortableListItem from '../../components/SortableListItem'
import ListItem from '../../components/ListItem'

type Props = {
  navigation: Object,
}
type State = {
  items: Array<Object>,
  editedItemId: ?string,
  name: ?string,
}

export default class App extends Component<Props, State> {
  // $FlowFixMe
  static navigationOptions = ({ navigation: { setParams, getParam } }) => {
    return {
      headerRight: (
        <Icon
          color={gray}
          name="sort"
          onPress={() => setParams({ sortable: !getParam('sortable') })}
          size={30}
          style={styles.icon}
        />
      ),
    }
  }

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

  _renderSortableItem = props => <SortableListItem {...props} />
  _editItem = (editedItemId): void => this.setState({ editedItemId })
  _removeItem = (id): void =>
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id),
    }))

  render() {
    const { getParam } = this.props.navigation
    const sortable = getParam('sortable')

    return sortable ? (
      <DraggableFlatList
        data={this.state.items}
        keyExtractor={({ id }) => id}
        onMoveEnd={({ data }) => this.setState({ items: data })}
        renderItem={this._renderSortableItem}
        style={styles.container}
      />
    ) : (
      <FlatList
        data={this.state.items}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <ListItem
            editedItemId={this.state.editedItemId}
            editItem={() => this._editItem(item.id)}
            handleChange={this._handleChange}
            handleEdit={this._handleEdit}
            item={item}
            removeItem={() => this._removeItem(item.id)}
          />
        )}
        style={styles.container}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    padding: 10,
  },
  separator: {
    backgroundColor: gray,
    height: StyleSheet.hairlineWidth,
  },
})
