import axios from 'axios'
import { GET_DISCUSSIONS, DISCUSSION_ERROR } from './types'

export const getDiscussions = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/discussion')
    dispatch({ type: GET_DISCUSSIONS, payload: res.data.discussionBundle })
  } catch (err) {
    dispatch({
      type: DISCUSSION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}
