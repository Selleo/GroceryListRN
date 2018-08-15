import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import ListItem from '../'

describe('<ListItem />', () => {
  const defaultProps = {
    editItem: jest.fn(),
    editedItemId: '1',
    handleChange: jest.fn(),
    handleEdit: jest.fn(),
    removeItem: jest.fn(),
    item: { id: '2', name: 'ItemName' },
  }

  const wrapper = renderer.create(<ListItem {...defaultProps} />)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
