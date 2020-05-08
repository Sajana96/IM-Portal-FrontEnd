import { GET_DISCUSSIONS, DISCUSSION_ERROR } from '../actions/types'

const initialState = {
  discussions: [],
  discussion: null,
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_DISCUSSIONS:
      return { ...state, discussions: payload, loading: false, error: {} }
    case DISCUSSION_ERROR:
      return { ...state, loading: false, error: payload }
    default:
      return state
  }
}
