import * as React from 'react'

import Icon from 'react-native-vector-icons/FontAwesome'

/* eslint-disable */
export default (icon: string): Object => ({
  tabBarIcon: ({ tintColor }) => <Icon color={tintColor} name={icon} size={24} />,
})
/* eslint-enable */
