import * as React from 'react'
import { Animated, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'

import { white } from '../../styles/colors'

type Props = {
  RTL: boolean,
  backgroundColor: string,
  iconName: string,
  onPress: Function,
  positionX: number,
  progress: object<{ interpolate: Function }>,
}

export default class RightButton extends React.PureComponent<Props> {
  render() {
    const { progress, positionX, iconName, onPress, backgroundColor, RTL } = this.props
    const outputRange = RTL ? [-positionX, 0] : [positionX, 0]

    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange,
    })

    return (
      <Animated.View style={[styles.container, { transform: [{ translateX: trans }] }]}>
        <RectButton onPress={onPress} style={[styles.rightAction, { backgroundColor }]}>
          <Icon color={white} name={iconName} size={24} />
        </RectButton>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
