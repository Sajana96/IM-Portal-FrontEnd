import axios from 'axios'
import { GET_NOTICES, NOTICE_ERROR, ADD_NOTICE } from './types'
import { setAlert } from './alert'

export const getNotices = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/notice')
    dispatch({ type: GET_NOTICES, payload: res.data })
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}

export const addNotice = (formData, user) => async (dispatch) => {
  try {
    const res = await axios.post('/api/notice', formData)
    const notice = { ...res.data, user }
    dispatch({
      type: ADD_NOTICE,
      payload: notice,
    })
    dispatch(setAlert('Notice added', 'success'))
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}
