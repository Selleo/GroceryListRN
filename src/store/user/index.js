const initialState = {
  RTL: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'SET_USER':
      return payload

    case 'TOGGLE_RTL':
      return { ...state, RTL: !state.RTL }

    default:
      return state
  }
}
