import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  CLEAR_SINGLE_POST,
  ADD_POST,
  DELETE_POST,
} from '../actions/types'

const initialState = {
  post: null,
  posts: [],
  error: {},
  loading: true,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_POSTS: {
      return { ...state, loading: false, posts: payload, error: {} }
    }

    case GET_POST: {
      return { ...state, loading: false, post: payload, error: {} }
    }

    case POST_ERROR: {
      return { ...state, loading: false, error: payload }
    }
    case CLEAR_SINGLE_POST: {
      return { ...state, loading: true, post: null }
    }
    case ADD_POST: {
      return { ...state, loading: true }
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      }
    }
    default:
      return state
  }
}
