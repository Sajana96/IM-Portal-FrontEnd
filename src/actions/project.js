import axios from 'axios'
import { GET_PROJECTS, PROJECT_ERROR } from '../actions/types'

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
