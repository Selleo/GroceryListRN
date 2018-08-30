/* @flow */
import type { Animation } from 'src/types'

import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Animated, StyleSheet, View, Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { connect } from 'react-redux'

import { transparent, lightGreen, white, red, orange } from 'src/styles/colors'
import type { ReduxStore } from 'src/store/index'
import RightButton from './RightButton'

const ITEM_WIDTH = 64

type Props = {
  children: React.Node,
  RTL: boolean,
  editItem: Function,
  removeItem: Function,
}

const { width } = Dimensions.get('screen')

export class SwipeableRow extends React.Component<Props> {
  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.RTL !== this.props.RTL) {
      this.swipeableRow.close()
    }
  }

  swipeableRow: React.ElementRef<typeof SwipeableRow>
  // $FlowFixMe
  updateRef = (ref): React.ElementRef<typeof SwipeableRow> => (this.swipeableRow = ref)
  close = (): void => this.swipeableRow.close()

  doneSwipe = (progress: Animation, dragX: Animation): React.Node => {
    const { RTL } = this.props
    const translateX: Animation = dragX.interpolate({
      inputRange: RTL ? [-width, -100, -50, 0] : [0, 50, 100, 101],
      outputRange: RTL ? [20, width - 50, width - 50, width - 20] : [-20, 0, 0, 1],
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

  handleRemoveItem = () => {
    this.close()
    setTimeout(this.props.removeItem, 300)
  }

  handleEdit = () => {
    this.close()
    this.props.editItem()
  }

  optionsSwipe = (progress: Object) => {
    const { RTL } = this.props

    const buttons = [
      <RightButton
        backgroundColor={orange}
        iconName="edit"
        key="edit"
        onPress={this.handleEdit}
        positionX={ITEM_WIDTH * 2}
        progress={progress}
        RTL={RTL}
      />,
      <RightButton
        backgroundColor={red}
        iconName="trash"
        key="delete"
        onPress={this.handleRemoveItem}
        positionX={ITEM_WIDTH}
        progress={progress}
        RTL={RTL}
      />,
    ]

    return <View style={styles.rightActionButtons}>{RTL ? buttons.reverse() : buttons}</View>
  }

  render(): React.Node {
    const { children, removeItem, RTL } = this.props
    const renderLeftActions = RTL ? this.optionsSwipe : this.doneSwipe
    const renderRightActions = RTL ? this.doneSwipe : this.optionsSwipe

    return (
      <Swipeable
        friction={2}
        leftThreshold={30}
        onSwipeableLeftOpen={removeItem}
        ref={this.updateRef}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        rightThreshold={40}
      >
        {children}
      </Swipeable>
    )
  }
}

const mapStateToProps = ({ user }: ReduxStore): Object => ({
  RTL: user.RTL,
})

export default connect(mapStateToProps)(SwipeableRow)

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
