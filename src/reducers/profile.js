import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  EDIT_PROFILE,
  ADD_EXPERIENCE,
  GET_PROFILES,
  GET_REPOS,
} from '../actions/types'

const initialState = {
  profile: null,
  profiles: [],
  repos: null,
  error: {},
  loading: true,
}

export default function (state = initialState, action) {
  const { payload, type } = action
  switch (type) {
    case GET_PROFILE:
    case EDIT_PROFILE:
    case ADD_EXPERIENCE:
      return { ...state, loading: false, profile: payload, error: {} }
    case GET_PROFILES:
      return { ...state, profiles: payload, loading: false }
    case GET_REPOS:
      return { ...state, repos: payload, loading: false }
    case PROFILE_ERROR:
      return { ...state, loading: false, error: payload }
    case CLEAR_PROFILE:
      return {
        ...state,
        repos: null,
        profile: null,
        loading: true,
        error: null,
      }
    default:
      return state
  }
}
