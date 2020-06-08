import { GET_NOTICES } from '../actions/types'

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
    default: {
      return state
    }
  }
}
