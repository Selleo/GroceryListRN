/* @flow */

import React, { Component } from 'react'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { FlatList } from 'react-native-gesture-handler'
import { Share, StyleSheet, View } from 'react-native'
import { FAB } from 'react-native-paper'

import ITEMS from '../../../fixtures/items'
import { gray } from '../../styles/colors'
import SortableListItem from '../../components/SortableListItem'
import ListItem from '../../components/ListItem'

type Props = {
  navigation: Object,
}
type State = {
  editedItemId: ?string,
  fabOpened: boolean,
  items: Array<Object>,
  modalOpened: boolean,
  name: ?string,
}

export default class App extends Component<Props, State> {
  state = {
    editedItemId: null,
    fabOpened: false,
    items: ITEMS,
    modalOpened: false,
    name: null,
  }

  _editItem = (editedItemId: string): void => this.setState({ editedItemId })
  _handleChange = (name: string): void => this.setState({ name })
  _openDialog = (): void => this.setState({ modalOpened: true })
  _renderSortableItem = props => <SortableListItem {...props} />
  _handleEdit = () => {
    const { editedItemId, name } = this.state

    this.setState(prevState => ({
      items: prevState.items.map(
        (item: Object) => (item.id === editedItemId ? { id: item.id, name } : item),
      ),
      editedItemId: null,
    }))
  }

  _removeItem = (id: string): void =>
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id),
    }))

  render() {
    const { items, fabOpened, editedItemId } = this.state
    const { getParam } = this.props.navigation
    const sortable: boolean = getParam('sortable')

    return (
      <View style={styles.container}>
        {sortable ? (
          <DraggableFlatList
            data={this.state.items}
            keyExtractor={({ id }) => id}
            onMoveEnd={({ data }) => this.setState({ items: data })}
            renderItem={this._renderSortableItem}
            style={styles.container}
          />
        ) : (
          <FlatList
            data={items}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <ListItem
                editedItemId={editedItemId}
                editItem={() => this._editItem(item.id)}
                handleChange={this._handleChange}
                handleEdit={this._handleEdit}
                item={item}
                removeItem={() => this._removeItem(item.id)}
              />
            )}
            style={styles.container}
          />
        )}
        <FAB.Group
          actions={[
            {
              icon: 'share',
              label: 'Share',
              onPress: () => Share.share(shareContent, shareOptions),
            },
            { icon: 'add', label: 'Add new product', onPress: this._openDialog },
          ]}
          icon={fabOpened ? 'today' : 'more'}
          onStateChange={({ open }) => this.setState({ fabOpened: open })}
          open={fabOpened}
        />
      </View>
    )
  }
}

const shareContent = {
  url: 'http://google.com',
  message: 'Ultra grocery list',
  title: 'Your best list',
}

const shareOptions = {
  dialogTitle: 'Your list goes to',
  subject: 'Your list goes to',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    backgroundColor: gray,
    height: StyleSheet.hairlineWidth,
  },
})
