import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types'

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  error: {},
  loading: true
}

export default function(state = initialState, action) {
  const { payload, type } = action
  switch (type) {
    case GET_PROFILE:
      return { ...state, loading: false, profile: payload }
    case PROFILE_ERROR:
      return { ...state, loading: false, error: payload }
    case CLEAR_PROFILE:
      return { ...state, repos: [], profile: null, loading: true, error: null }
    default:
      return state
  }
}
