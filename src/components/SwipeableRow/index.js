import React, { Component } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

import { RectButton } from 'react-native-gesture-handler'

import Swipeable from 'react-native-gesture-handler/Swipeable'
import { transparent, lightGreen, white } from '../../styles/variables'

type Props = {
  children: any,
  removeItem: Function,
}

export default class SwipeableRow extends Component<Props> {
  _renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    })

    return (
      <RectButton onPress={this.close} style={styles.leftAction}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          Done
        </Animated.Text>
      </RectButton>
    )
  }

  _renderRightAction = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    })

    const pressHandler = () => {
      this.close()
      alert(text)
    }

    return (
      <Animated.View style={[styles.container, { transform: [{ translateX: trans }] }]}>
        <RectButton onPress={pressHandler} style={[styles.rightAction, { backgroundColor: color }]}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    )
  }

  _renderRightActions = progress => (
    <View style={styles.rightActionButtons}>
      {this._renderRightAction('More', '#C8C7CD', 192, progress)}
      {this._renderRightAction('Flag', '#ffab00', 128, progress)}
      {this._renderRightAction('More', '#dd2c00', 64, progress)}
    </View>
  )

  _updateRef = ref => (this._swipeableRow = ref)

  close = () => this._swipeableRow.close()

  render() {
    const { children, removeItem } = this.props

    return (
      <Swipeable
        friction={2}
        leftThreshold={30}
        onSwipeableLeftOpen={removeItem}
        ref={this._updateRef}
        renderLeftActions={this._renderLeftActions}
        renderRightActions={this._renderRightActions}
        rightThreshold={40}
      >
        {children}
      </Swipeable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftAction: {
    flex: 1,
    backgroundColor: lightGreen,
    justifyContent: 'center',
  },
  actionText: {
    color: white,
    fontSize: 16,
    backgroundColor: transparent,
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  rightActionButtons: {
    width: 192,
    flexDirection: 'row',
  },
})
