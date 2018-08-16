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

  test('render', () => {
    const wrapper = renderer.create(<ListItem {...defaultProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  test.skip('render Text Input', () => {
    // TODO: Check how to mock renders inside `react-native-paper`

    const wrapper = renderer.create(
      <ListItem {...defaultProps} item={{ id: '1', name: 'toEdit' }} />,
    )

    expect(wrapper).toMatchSnapshot()
  })
})
