import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createStackNavigator } from 'react-navigation'
import { StyleSheet } from 'react-native'

import { gray } from '../../styles/colors'
import List from './List'

export default createStackNavigator({
  List: {
    screen: List,
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
})

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
})
