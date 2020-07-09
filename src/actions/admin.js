import { ADMIN_USERS, ADMIN_ERROR } from './types'
import axios from 'axios'

export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/admin')
    dispatch({
      type: ADMIN_USERS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: ADMIN_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}
