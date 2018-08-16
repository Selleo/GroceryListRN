import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

import RightButton from '../RightButton'

describe('<RightButton />', () => {
  const defaultProps = {
    backgroundColor: '#000',
    iconName: 'music',
    onPress: jest.fn(),
    positionX: 1,
    progress: { interpolate: jest.fn() },
  }

  const wrapper = renderer.create(<RightButton {...defaultProps} />)

  test('render', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
