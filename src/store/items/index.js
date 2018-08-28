export default (state = [], { type, payload }) => {
  switch (type) {
    case 'SET_ITEMS':
      return payload

    default:
      return state
  }
}
