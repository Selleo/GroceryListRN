global.window = {}

jest.mock('NativeModules', () => ({
  UIManager: {
    RCTView: () => {},
  },
  RNGestureHandlerModule: {
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    State: {},
    Directions: {},
  },
}))

const interpolate = jest.fn(() => ({ interpolate }))

const animationObject = {
  interpolate,
  start: jest.fn(),
  addListener: jest.fn(),
  __makeNative: jest.fn(),
  removeListener: jest.fn(),
  removeAllListeners: jest.fn(),
}

jest.mock('Animated', () => ({
  View: require.requireActual('View'),
  ScrollView: require.requireActual('ScrollView'),
  Image: require.requireActual('Image'),
  Text: require.requireActual('Text'),
  Value: jest.fn(() => animationObject),
  add: jest.fn(() => animationObject),
  createAnimatedComponent: jest.fn(),
  event: jest.fn(() => animationObject),
  interpolate: jest.fn(),
  loop: jest.fn(() => animationObject),
  timing: jest.fn(() => animationObject),
}))
