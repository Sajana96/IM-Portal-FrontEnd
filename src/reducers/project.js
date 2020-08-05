import { GET_PROJECTS, PROJECT_ERROR } from '../actions/types'

const initialState = {
  project: null,
  projects: [],
  error: {},
  loading: true,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_PROJECTS: {
      return { ...state, loading: false, error: {}, projects: payload }
    }
    case PROJECT_ERROR: {
      return { ...state, loading: false, error: payload }
    }
    default: {
      return state
    }
  }
}
