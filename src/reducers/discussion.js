import {
  GET_DISCUSSIONS,
  DISCUSSION_ERROR,
  CLEAR_DISCUSSION,
  UPDATE_LIKES,
  DELETE_DISCUSSION,
} from '../actions/types'

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
    case CLEAR_DISCUSSION:
      return {
        ...state,
        discussions: [],
        discussion: null,
        loading: true,
        error: {},
      }
    case UPDATE_LIKES: {
      return {
        ...state,
        discussions: state.discussions.map((discussion) =>
          discussion._id === payload.id
            ? { ...discussion, likes: payload.likes }
            : discussion
        ),
        loading: false,
      }
    }
    case DELETE_DISCUSSION: {
      return {
        ...state,
        discussions: state.discussions.filter(
          (discussion) => discussion._id !== payload.id
        ),
        loading: false,
      }
    }
    default:
      return state
  }
}
