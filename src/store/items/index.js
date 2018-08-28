export default (state = [], { type, payload }) => {
  switch (type) {
    case 'SET_ITEMS':
      return payload

    case 'ADD_ITEMS':
      return [...state, ...payload]

    default:
      return state
  }
}
