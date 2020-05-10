import axios from 'axios'
import {
  GET_DISCUSSIONS,
  DISCUSSION_ERROR,
  CLEAR_DISCUSSION,
  UPDATE_LIKES,
} from './types'

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

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/discussion/like/${postId}`)
    dispatch({ type: UPDATE_LIKES, payload: { id: postId, likes: res.data } })
  } catch (err) {
    dispatch({
      type: DISCUSSION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}

export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/discussion/unlike/${postId}`)
    dispatch({ type: UPDATE_LIKES, payload: { id: postId, likes: res.data } })
  } catch (err) {
    dispatch({
      type: DISCUSSION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}
