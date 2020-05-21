import {
  GET_DISCUSSIONS,
  DISCUSSION_ERROR,
  CLEAR_DISCUSSION,
  UPDATE_LIKES,
  DELETE_DISCUSSION,
  ADD_DISCUSSION,
  SEARCH_DISCUSSION,
  GET_DISCUSSION,
  CLEAR_SINGLE_DISCUSSION,
  LIKE_COMMENT,
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
    case ADD_DISCUSSION: {
      return {
        ...state,
        discussions: [payload, ...state.discussions],
        loading: false,
      }
    }
    case SEARCH_DISCUSSION: {
      const filterDiscussions = state.discussions
      return {
        ...state,
        discussions: filterDiscussions.filter(
          (discussion) =>
            discussion.content.toLowerCase().includes(payload) ||
            discussion.area.toLowerCase().includes(payload)
        ),
        loading: false,
      }
    }
    case GET_DISCUSSION: {
      return { ...state, discussion: payload, loading: false }
    }
    case CLEAR_SINGLE_DISCUSSION: {
      return { ...state, loading: true, discussion: null }
    }
    case LIKE_COMMENT: {
      return {
        ...state,
        discussion: { ...state.discussion, comments: payload.comments },
      }
    }
    default:
      return state
  }
}
