import axios from 'axios'
import { GET_DISCUSSIONS, DISCUSSION_ERROR, CLEAR_DISCUSSION } from './types'

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

export const clearDiscussion = () => async (dispatch) => {
  dispatch({ type: CLEAR_DISCUSSION })
}
