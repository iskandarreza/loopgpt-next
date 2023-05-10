import { OPEN_FILE_UPLOAD_DIALOG, CLOSE_FILE_UPLOAD_DIALOG } from '../types'

const initialState = {
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
    default:
      return state
  }
}
