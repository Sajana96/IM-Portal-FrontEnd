import axios from 'axios'
import {
  GET_PROJECTS,
  PROJECT_ERROR,
  SUBSCRIBE_PROJECT,
  UNSUBSCRIBE_PROJECT,
  ADD_PROJECT,
} from '../actions/types'
import { setAlert } from './alert'

export const getProjects = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/project')
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}

export const subscribe = (projectId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/project/interested/${projectId}`)
    dispatch({
      type: SUBSCRIBE_PROJECT,
      payload: { id: projectId, interested: res.data },
    })
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}

export const unsubscribe = (projectId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/project/uninterested/${projectId}`)
    dispatch({
      type: UNSUBSCRIBE_PROJECT,
      payload: { id: projectId, interested: res.data },
    })
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}

export const addProject = (user, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await axios.post('/api/project', formData, config)
    const project = { ...res.data, user }
    dispatch({ type: ADD_PROJECT, payload: { project: project } })

    dispatch(setAlert('Project Added', 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}
