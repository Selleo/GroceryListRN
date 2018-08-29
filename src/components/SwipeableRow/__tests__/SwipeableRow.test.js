import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import { SwipeableRow } from '../'

describe('<SwipeableRow />', () => {
  const defaultProps = {
    children: 'Component',
    editItem: jest.fn(),
    removeItem: jest.fn(),
    RTL: false,
  }

  const wrapper = renderer.create(<SwipeableRow {...defaultProps} />)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
