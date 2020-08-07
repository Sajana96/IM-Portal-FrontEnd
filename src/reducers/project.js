import {
  GET_PROJECTS,
  PROJECT_ERROR,
  SUBSCRIBE_PROJECT,
  UNSUBSCRIBE_PROJECT,
  ADD_PROJECT,
} from '../actions/types'

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
    case SUBSCRIBE_PROJECT: {
      return {
        ...state,
        loading: false,
        projects: state.projects.map((obj) =>
          obj._id === payload.id
            ? { ...obj, interested: payload.interested }
            : obj
        ),
      }
    }
    case UNSUBSCRIBE_PROJECT: {
      return {
        ...state,
        loading: false,
        projects: state.projects.map((obj) =>
          obj._id === payload.id
            ? { ...obj, interested: payload.interested }
            : obj
        ),
      }
    }
    case ADD_PROJECT: {
      return {
        ...state,
        loading: false,
        projects: [payload.project, ...state.projects],
      }
    }
    default: {
      return state
    }
  }
}
