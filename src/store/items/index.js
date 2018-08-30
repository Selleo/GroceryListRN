export default (state = [], { type, payload }) => {
  switch (type) {
    case 'SET_ITEMS':
      return payload

    case 'ADD_ITEMS':
      return [...state, ...payload]

    case 'REMOVE_ITEM':
      return state.reject(item => item.id === payload)

    case 'UPDATE_ITEM':
      return state.map(item => (item.id === payload.id ? payload : item))

    default:
      return state
  }
}
