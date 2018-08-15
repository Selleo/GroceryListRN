import * as React from 'react'
import { Text, StyleSheet } from 'react-native'
import { RectButton, TextInput } from 'react-native-gesture-handler'

import SwipeableRow from '../SwipeableRow'
import { white, transparent } from '../../styles/colors'

type Props = {
  editItem: Function,
  editedItemId: ?string,
  handleChange: Function,
  handleEdit: Function,
  item: object,
  removeItem: Function,
}

const SortableListItem = (props: Props) => {
  const {
    editItem,
    editedItemId,
    handleChange,
    handleEdit,
    removeItem,
    item: { id, name },
  } = props

  return (
    <SwipeableRow editItem={editItem} removeItem={removeItem}>
      <RectButton style={styles.button}>
        {id === editedItemId ? (
          <TextInput
            autoFocus={true}
            onBlur={handleEdit}
            onChangeText={handleChange}
            onSubmitEditing={handleEdit}
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
}

export default SortableListItem

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
