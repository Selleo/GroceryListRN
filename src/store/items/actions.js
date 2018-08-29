export const setItems = payload => ({
  type: 'SET_ITEMS',
  payload,
})

export const addItems = payload => ({
  type: 'ADD_ITEMS',
  payload,
})

export const removeItem = id => ({
  type: 'REMOVE_ITEM',
  payload: id,
})
