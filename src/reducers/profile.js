import { GET_PROFILE, PROFILE_ERROR } from '../actions/types'

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
      return { ...state, loading: false, profile: payload, error: null }
    case PROFILE_ERROR:
      return { ...state, profile: null, loading: false, error: payload }
    default:
      return state
  }
}
