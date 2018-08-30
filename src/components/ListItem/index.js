import * as React from 'react'
import { StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Text, TextInput } from 'react-native-paper'

import SwipeableRow from 'src/components/SwipeableRow'
import { white, transparent } from 'src/styles/colors'

type Props = {
  editItem: Function,
  editable: boolean,
  handleChange: Function,
  handleEdit: Function,
  item: object,
  removeItem: Function,
}

export default class ListItem extends React.PureComponent<Props> {
  render() {
    const {
      editItem,
      editable,
      handleChange,
      handleEdit,
      removeItem,
      item: { name },
    } = this.props

    return (
      <SwipeableRow editItem={editItem} removeItem={removeItem}>
        <RectButton style={styles.button}>
          {editable ? (
            <TextInput
              autoFocus={true}
              defaultValue={name}
              onBlur={handleEdit}
              onChangeText={handleChange}
              onSubmitEditing={handleEdit}
              returnKeyLabel="Save"
              returnKeyType="done"
            />
          ) : (
            <Text numberOfLines={2} style={styles.text}>
              {name}
            </Text>
          )}
        </RectButton>
      </SwipeableRow>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50,
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
