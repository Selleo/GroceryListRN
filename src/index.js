import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createStackNavigator } from 'react-navigation'
import { StyleSheet } from 'react-native'

import Main from './scenes/Main'
import { gray } from './styles/colors'

const Scenes = {
  Main: {
    screen: Main,
    navigationOptions: ({ navigation: { setParams, getParam } }) => ({
      headerRight: (
        <Icon
          color={gray}
          name="sort"
          onPress={() => setParams({ sortable: !getParam('sortable') })}
          size={30}
          style={styles.icon}
        />
      ),
    }),
  },
}

export default createStackNavigator(Scenes)

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
})
