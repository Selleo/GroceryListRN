/* @flow */
import type { Animation } from '../../types'

import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Animated, StyleSheet, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import RightButton from './RightButton'
import { transparent, lightGreen, white, red, orange } from '../../styles/colors'

const ITEM_WIDTH = 64

type Props = {
  children: React.Node,
  editItem: Function,
  removeItem: Function,
}

export default class SwipeableRow extends React.Component<Props> {
  _swipeableRow: React.ElementRef<typeof SwipeableRow>
  close = (): void => this._swipeableRow.close()

  // $FlowFixMe
  updateRef = (ref): React.ElementRef<typeof SwipeableRow> => (this._swipeableRow = ref)

  _renderLeftActions = (progress: Animation, dragX: Animation): React.Node => {
    const translateX: Animation = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    })

    return (
      <RectButton onPress={this.close} style={styles.leftAction}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <Icon color={white} name="check" size={24} />
        </Animated.Text>
      </RectButton>
    )
  }

  _handleRemoveItem = () => {
    this.close()
    setTimeout(this.props.removeItem, 300)
  }

  _handleEdit = () => {
    this.close()
    this.props.editItem()
  }

  _renderRightActions = progress => (
    <View style={styles.rightActionButtons}>
      <RightButton
        backgroundColor={orange}
        iconName="edit"
        onPress={this._handleEdit}
        positionX={ITEM_WIDTH * 2}
        progress={progress}
      />
      <RightButton
        backgroundColor={red}
        iconName="trash"
        onPress={this._handleRemoveItem}
        positionX={ITEM_WIDTH}
        progress={progress}
      />
    </View>
  )

  render(): React.Node {
    const { children, removeItem } = this.props

    return (
      <Swipeable
        friction={2}
        leftThreshold={30}
        onSwipeableLeftOpen={removeItem}
        ref={this.updateRef}
        renderLeftActions={this._renderLeftActions}
        renderRightActions={this._renderRightActions}
        rightThreshold={40}
      >
        {children}
      </Swipeable>
    )
  }
}

const styles: Object = StyleSheet.create({
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
  rightActionButtons: {
    width: ITEM_WIDTH * 2,
    flexDirection: 'row',
  },
})
