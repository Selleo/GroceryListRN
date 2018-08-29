/* @flow */

import React, { Component } from 'react'
import DraggableFlatList from 'react-native-draggable-flatlist'
import compact from 'lodash/compact'
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import { Share, StyleSheet, View } from 'react-native'
import { Button, FAB, Text, Dialog, TextInput } from 'react-native-paper'

import { addItems, removeItem } from '../../store/items/actions'
import { gray, white } from '../../styles/colors'
import SortableListItem from '../../components/SortableListItem'
import ListItem from '../../components/ListItem'
import { randomId } from '../../utils'

type Props = {
  addItems: Function,
  items: Array<Object>,
  navigation: Object,
  removeItem: Function,
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
    const { editedItemId, name } = this.state

    this.setState(prevState => ({
      items: prevState.items.map(
        (item: Object) => (item.id === editedItemId ? { id: item.id, name } : item),
      ),
      editedItemId: null,
    }))
  }

  removeItem = (id: string): void =>
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id),
    }))

  shareContent = (): Object => ({
    url: 'http://google.com',
    message: `GroceryList://items?items=${this.items()}`,
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
                editedItemId={editedItemId}
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
