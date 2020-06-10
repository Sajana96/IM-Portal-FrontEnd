import { GET_NOTICES, ADD_NOTICE, DELETE_NOTICE } from '../actions/types'

const initialState = {
  notices: [],
  error: {},
  loading: true,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_NOTICES: {
      return { ...state, loading: false, notices: payload }
    }
    case ADD_NOTICE: {
      return { ...state, loading: false, notices: [payload, ...state.notices] }
    }
    case DELETE_NOTICE: {
      return {
        ...state,
        loading: false,
        notices: state.notices.filter((notice) => notice._id !== payload),
      }
    }
    default: {
      return state
    }
  }
}
