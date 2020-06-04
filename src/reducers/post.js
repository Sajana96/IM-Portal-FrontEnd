import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  CLEAR_SINGLE_POST,
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
    default:
      return state
  }
}
