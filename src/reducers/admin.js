import {
  ADMIN_USERS,
  ADMIN_ERROR,
  USER_ACCESS_MODIFIED,
} from '../actions/types'

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
    case USER_ACCESS_MODIFIED:
      return {
        ...state,
        loading: false,
        users: state.users.map((obj) => {
          return obj._id == payload._id ? payload : obj
        }),
      }
    default:
      return state
  }
}
