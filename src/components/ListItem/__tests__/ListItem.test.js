import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import store from 'src/store'
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
    const wrapper = renderer.create(
      <Provider store={store}>
        <ListItem {...defaultProps} />
      </Provider>,
    )

    expect(wrapper).toMatchSnapshot()
  })

  test.skip('render Text Input', () => {
    // TODO: Check how to mock renders inside `react-native-paper`

    const wrapper = renderer.create(
      <Provider store={store}>
        <ListItem {...defaultProps} item={{ id: '1', name: 'toEdit' }} />
      </Provider>,
    )

    expect(wrapper).toMatchSnapshot()
  })
})
