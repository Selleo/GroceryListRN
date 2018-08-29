import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { StyleSheet } from 'react-native'

import { sceneConfig } from './utils'
import Home from './scenes/Home'
import Profile from './scenes/Profile'
import { gray, white } from './styles/colors'

const Scenes = {
  Home: {
    screen: Home,
    navigationOptions: sceneConfig('home'),
  },
  Profile: {
    screen: Profile,
    navigationOptions: sceneConfig('user'),
  },
}

const config = {
  shifting: true,
  initialRouteName: 'Home',
  activeTintColor: '#0000ff',
  inactiveTintColor: gray,
  barStyle: {
    borderColor: gray,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: white,
  },
}

export default createMaterialBottomTabNavigator(Scenes, config)
