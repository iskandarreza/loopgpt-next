import { SET_CONFIG_ITEM } from '../types'

const initialState = {
  config: {},
  settings: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CONFIG_ITEM:
      const { configType, key, value } = action.payload
      return {
        ...state,
        [configType]: { [key]: value },
      }

    default:
      return state
  }
}
