import axios from 'axios'
import { GET_NOTICES, NOTICE_ERROR } from './types'

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
