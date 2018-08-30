import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import store from 'src/store'
import { SwipeableRow } from '../'

describe('<SwipeableRow />', () => {
  const defaultProps = {
    children: 'Component',
    editItem: jest.fn(),
    removeItem: jest.fn(),
    RTL: false,
  }

  const wrapper = renderer.create(
    <Provider store={store}>
      <SwipeableRow {...defaultProps} />
    </Provider>,
  )

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
