import React, { PureComponent } from 'react'
import { Animated, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

import { gray, white, transparent } from 'src/styles/colors'

type Props = {
  move: Function,
  moveEnd: Function,
  isActive: boolean,
  item: object,
}

export class SortableListItem extends PureComponent<Props> {
  state = {
    animation: new Animated.Value(0),
  }

  componentDidMount = () => {
    this.loopAnimation()
  }

  loopAnimation = () => {
    this.animation = Animated.loop(
      Animated.timing(this.state.animation, {
        duration: 200,
        isInteraction: false,
        toValue: 1,
      }),
    ).start()
  }

  render() {
    const {
      move,
      moveEnd,
      isActive,
      item: { name },
    } = this.props
    const animationValue = this.state.animation.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: ['0deg', '1deg', '0deg', '-1deg', '0deg'],
    })

    return (
      <Animated.View style={{ transform: [{ rotateZ: animationValue }] }}>
        <TouchableOpacity
          onPressIn={move}
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
