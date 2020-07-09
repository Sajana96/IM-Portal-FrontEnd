import { ADMIN_USERS, ADMIN_ERROR } from '../actions/types'

const initialState = {
  users: [],
  loading: true,
  user: null,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case ADMIN_USERS:
      return { ...state, users: payload, loading: false }
    case ADMIN_ERROR:
      return { ...state, users: [], loading: false, error: payload }
    default:
      return state
  }
}
