jest.mock('NativeModules', () => {
  return {
    UIManager: {
      RCTView: () => ({}),
    },
    RNGestureHandlerModule: {
      attachGestureHandler: jest.fn(),
      createGestureHandler: jest.fn(),
      dropGestureHandler: jest.fn(),
      updateGestureHandler: jest.fn(),
      State: {},
      Directions: {},
    },
  }
})

const interpolate = jest.fn(() => ({ interpolate }))

jest.mock('Animated', () => ({
  View: require.requireActual('View'),
  ScrollView: require.requireActual('ScrollView'),
  Image: require.requireActual('Image'),
  Text: require.requireActual('Text'),
  loop: jest.fn(() => ({
    interpolate: jest.fn(),
    start: jest.fn(),
  })),
  createAnimatedComponent: jest.fn(),
  event: jest.fn(() => ({
    interpolate: jest.fn(),
    start: jest.fn(),
  })),
  timing: jest.fn(() => ({ start: jest.fn() })),
  interpolate: jest.fn(),
  add: jest.fn(() => ({
    interpolate,
  })),
  divide: jest.fn(() => ({
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
  })),
  Value: jest.fn(() => ({
    interpolate: jest.fn(),
    __makeNative: jest.fn(),
    addListener: jest.fn(),
  })),
}))
