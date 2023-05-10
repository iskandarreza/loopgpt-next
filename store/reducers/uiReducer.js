import {
  OPEN_FILE_UPLOAD_DIALOG,
  CLOSE_FILE_UPLOAD_DIALOG,
  APPEND_WEBSOCKET_MESSAGES,
  CLEAR_WEBSOCKET_MESSAGES,
} from '../types'

const initialState = {
  messages: [],
  fileUploadDialog: {
    isOpen: false,
  },
}

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_FILE_UPLOAD_DIALOG:
      return {
        ...state,
        fileUploadDialog: {
          isOpen: true,
        },
      }

    case CLOSE_FILE_UPLOAD_DIALOG:
      return {
        ...state,
        fileUploadDialog: {
          isOpen: false,
        },
      }

    case APPEND_WEBSOCKET_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }

    case CLEAR_WEBSOCKET_MESSAGES:
      return {
        ...state,
        messages: [],
      }

    default:
      return state
  }
}
