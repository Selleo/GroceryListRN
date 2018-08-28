/* @flow */

import React, { Component } from 'react'
import DraggableFlatList from 'react-native-draggable-flatlist'
import compact from 'lodash/compact'
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { Share, StyleSheet, View } from 'react-native'
import { Button, FAB, Text, Dialog, TextInput } from 'react-native-paper'

import { gray, white } from '../../styles/colors'
import SortableListItem from '../../components/SortableListItem'
import ListItem from '../../components/ListItem'

type Props = {
  navigation: Object,
  items: Array<Object>,
}

type State = {
  editedItemId: ?string,
  fabOpened: boolean,
  items: Array<Object>,
  modalOpened: boolean,
  name: ?string,
  newItemsString: string,
}

export class App extends Component<Props, State> {
  state = {
    editedItemId: null,
    fabOpened: false,
    items: [],
    modalOpened: false,
    name: null,
    newItemsString: '',
  }

  componentDidMount = () => this.setState({ items: this.props.items })

  _items = () => encodeURI(JSON.stringify(this.state.items))
  _renderSortableItem = props => <SortableListItem {...props} />
  _handleStateChange = (key: string): Function => (name: string): void =>
    this.setState({ [key]: name })

  _addNewProduct = (): void => {
    const { items, newItemsString } = this.state
    const newItems: Array<{ name: string, id: string }> = compact(
      newItemsString.split(/[.,\n]/gi),
    ).map(name => ({
      name,
      id: (+new Date() * Math.random()).toString.slice(0, 5),
    }))

    this.setState({ items: items.concat(newItems), modalOpened: false })
  }

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

  _shareContent = (): Object => ({
    url: 'http://google.com',
    message: `GroceryList://items?items=${this._items()}`,
    title: 'Your best list',
  })

  render() {
    const { fabOpened, editedItemId, modalOpened } = this.state
    const { getParam } = this.props.navigation
    const sortable: boolean = getParam('sortable')
    const items = [...this.state.items, ...this.props.items]

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
                editItem={() => this._handleStateChange('editedItemId')(item.id)}
                handleChange={this._handleStateChange('name')}
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
              onPress: () => Share.share(this._shareContent(), shareOptions),
            },
            {
              icon: 'add',
              label: 'Add new product',
              onPress: () => this._handleStateChange('modalOpened')(true),
            },
          ]}
          icon={fabOpened ? 'today' : 'more'}
          onStateChange={({ open }) => this._handleStateChange('fabOpened')(open)}
          open={fabOpened}
        />
        <Dialog
          onDismiss={() => this._handleStateChange('modalOpened')(false)}
          visible={modalOpened}
        >
          <Dialog.Title>Add new product</Dialog.Title>
          <Dialog.Content>
            <TextInput
              autoFocus={true}
              onChangeText={this._handleStateChange('newItemsString')}
              onSubmitEditing={this._addNewProduct}
              returnKeyLabel="Save"
              returnKeyType="done"
            />
          </Dialog.Content>

          <Dialog.Actions>
            <Button mode="contained" onPress={this._addNewProduct}>
              <Text style={styles.text}>Create</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </View>
    )
  }
}

const mapStateToProps = ({ items }: Object): Object => ({ items })

export default connect(mapStateToProps)(App)

const shareOptions = {
  dialogTitle: 'Your list goes to...',
  subject: 'Your list goes to...',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    backgroundColor: gray,
    height: StyleSheet.hairlineWidth,
  },
  text: {
    color: white,
  },
})
