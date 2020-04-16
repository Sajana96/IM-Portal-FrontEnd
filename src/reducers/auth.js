import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  loading: true,
  isAuthenticated: null,
  user: null
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOAD_USER:
      return { ...state, user: payload, loading: false, isAuthenticated: true }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return { ...state, ...payload, isAuthenticated: true, loading: false }
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      localStorage.removeItem('token')
      return { ...state, isAuthenticated: false, loading: false, token: null }
    default:
      return state
  }
}
