import React, { Component } from 'react'
import { Animated } from 'react-native'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import { gray, white, transparent } from '../../styles/colors'

type Props = {
  move: Function,
  moveEnd: Function,
  isActive: boolean,
  item: object,
}

class SortableListItem extends Component<Props> {
  state = {
    animation: Animated.Value(0),
  }

  componentDidMount = () => {}

  render() {
    const {
      move,
      moveEnd,
      isActive,
      item: { name },
    } = this.props

    return (
      <Animated.View>
        <TouchableOpacity
          onLongPress={move}
          onPressOut={moveEnd}
          style={[styles.container, { backgroundColor: isActive ? gray : white }]}
        >
          <Text numberOfLines={2} style={styles.text}>
            {name}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

export default SortableListItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  text: {
    fontWeight: 'bold',
    backgroundColor: transparent,
  },
})
