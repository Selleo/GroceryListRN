/* @flow */

import React, { Component } from 'react'
import DraggableFlatList from 'react-native-draggable-flatlist'
import compact from 'lodash/compact'
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { Share, StyleSheet, View } from 'react-native'
import { Button, FAB, Text, Dialog, TextInput } from 'react-native-paper'

import ListItem from 'src/components/ListItem'
import SortableListItem from 'src/components/SortableListItem'
import { addItems, removeItem, updateItem } from 'src/store/items/actions'
import { gray, white } from 'src/styles/colors'
import { randomId } from 'src/utils'

type Props = {
  addItems: Function,
  items: Array<Object>,
  navigation: Object,
  removeItem: Function,
  updateItem: Function,
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
  items = () => this.props.items.map(({ name, id }) => `${name}:${id}`).join(';')
  removeItem = (id: string): void => this.props.removeItem(id)
  renderSortableItem = (props: Object) => <SortableListItem {...props} />

  handleStateChange = (key: string): Function => (name: string): void =>
    this.setState({ [key]: name })

  addNewProduct = (): void => {
    const newItems: Array<{ name: string, id: string }> = compact(
      this.state.newItemsString.split(/[.,\n]/gi),
    ).map(name => ({
      name: name.trim(),
      id: randomId(),
    }))

    this.props.addItems(newItems)
    this.setState({ modalOpened: false })
  }

  handleEdit = () => {
    const { items, updateItem } = this.props
    const { editedItemId, name } = this.state
    const oldItem = items.find(item => item.id === editedItemId)

    updateItem({ ...oldItem, name })
    this.setState({ editedItemId: null })
  }

  shareContent = (): Object => ({
    url: 'http://google.com',
    message: `grocerylist://items?items=${this.items()}`,
    title: 'Your best list',
  })

  render() {
    const { items, navigation } = this.props
    const { fabOpened, editedItemId, modalOpened } = this.state
    const { getParam } = navigation
    const sortable: boolean = getParam('sortable')

    return (
      <View style={styles.container}>
        {sortable ? (
          <DraggableFlatList
            data={items}
            keyExtractor={({ id }) => id}
            onMoveEnd={({ data }) => this.setState({ items: data })}
            renderItem={this.renderSortableItem}
            style={styles.container}
          />
        ) : (
          <FlatList
            data={items}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <ListItem
                editable={editedItemId === item.id}
                editItem={() => this.handleStateChange('editedItemId')(item.id)}
                handleChange={this.handleStateChange('name')}
                handleEdit={this.handleEdit}
                item={item}
                removeItem={() => this.removeItem(item.id)}
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
              onPress: () =>
                Share.share(this.shareContent(), {
                  dialogTitle: 'Share your list with:',
                  subject: 'Share your list with:',
                }),
            },
            {
              icon: 'add',
              label: 'Add new product',
              onPress: () => this.handleStateChange('modalOpened')(true),
            },
          ]}
          icon={fabOpened ? 'today' : 'more'}
          onStateChange={({ open }) => this.handleStateChange('fabOpened')(open)}
          open={fabOpened}
        />

        <Dialog
          onDismiss={() => this.handleStateChange('modalOpened')(false)}
          visible={modalOpened}
        >
          <Dialog.Title>Add new product</Dialog.Title>
          <Dialog.Content>
            <TextInput
              autoFocus={true}
              onChangeText={this.handleStateChange('newItemsString')}
              onSubmitEditing={this.addNewProduct}
              returnKeyLabel="Save"
              returnKeyType="done"
            />
          </Dialog.Content>

          <Dialog.Actions>
            <Button mode="contained" onPress={this.addNewProduct}>
              <Text style={styles.text}>Create</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </View>
    )
  }
}

const mapStateToProps = ({ items }: Object): Object => ({
  items,
})

const mapDispatchToProps = {
  addItems,
  removeItem,
  updateItem,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

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
