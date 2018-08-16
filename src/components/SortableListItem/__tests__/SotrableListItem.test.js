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

  test('render', () => {
    const wrapper = renderer.create(<SortableListItem {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  test('render inActive item', () => {
    const wrapper = renderer.create(<SortableListItem {...defaultProps} isActive={true} />)

    expect(wrapper).toMatchSnapshot()
  })
})
