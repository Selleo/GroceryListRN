import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import SortableListItem from '../'

describe('<SortableListItem />', () => {
  const defaultProps = {
    editItem: jest.fn(),
    move: jest.fn(),
    moveEnd: jest.fn(),
    isActive: false,
    item: { name: 'ItemName' },
  }

  const wrapper = renderer.create(<SortableListItem {...defaultProps} />)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
