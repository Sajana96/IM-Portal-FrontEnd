import axios from 'axios'
import {
  GET_DISCUSSIONS,
  DISCUSSION_ERROR,
  CLEAR_DISCUSSION,
  UPDATE_LIKES,
  DELETE_DISCUSSION,
  ADD_DISCUSSION,
  SEARCH_DISCUSSION,
  GET_DISCUSSION,
  CLEAR_SINGLE_DISCUSSION,
  LIKE_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT,
} from './types'
import { setAlert } from './alert'

//Get all discussions
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

//Clear discussion
export const clearDiscussion = () => async (dispatch) => {
  dispatch({ type: CLEAR_DISCUSSION })
}

//Clear one discussion
export const clearSingleDiscussion = () => async (dispatch) => {
  dispatch({ type: CLEAR_SINGLE_DISCUSSION })
}

//Add like
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

//Remove like
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

//Delete discussion
export const deleteDiscussion = (discussionId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/discussion/${discussionId}`)
    console.log(res.data.msg)
    dispatch({
      type: DELETE_DISCUSSION,
      payload: { id: discussionId },
    })
    dispatch(setAlert(res.data.msg, 'danger'))
  } catch (err) {
    dispatch({
      type: DISCUSSION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}
//Add Discussion
export const addDiscussion = (formData, user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await axios.post('/api/discussion', formData, config)
    const discussion = { ...res.data, user }
    dispatch({ type: ADD_DISCUSSION, payload: discussion })

    dispatch(setAlert('Discussion Published', 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: DISCUSSION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}

//Search Discussion
export const searchDiscussion = (query) => (dispatch) => {
  dispatch({ type: SEARCH_DISCUSSION, payload: query.toLowerCase() })
}

//Get one discussion by id
export const getDiscussion = (id) => async (dispatch) => {
  await dispatch(clearSingleDiscussion())
  try {
    const res = await axios.get(`/api/discussion/${id}`)
    dispatch({ type: GET_DISCUSSION, payload: res.data })
  } catch (err) {
    dispatch({
      type: DISCUSSION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}

//adding like to comment
export const markComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/discussion/comment/${postId}/${commentId}`
    )
    dispatch({
      type: LIKE_COMMENT,
      payload: { id: postId, comments: res.data },
    })
  } catch (err) {
    dispatch({
      type: DISCUSSION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}

//Add Comment to a Discussion
export const addComment = (formData, postId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await axios.post(
      `/api/discussion/comment/${postId}`,
      formData,
      config
    )

    dispatch({ type: ADD_COMMENT, payload: { comments: res.data } })

    dispatch(setAlert('Comment Added', 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: DISCUSSION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}

//Delete comment
export const deleteComment = (discussionId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/discussion/comment/${discussionId}/${commentId}`
    )
    console.log(res)
    if (res.status === 200) {
      dispatch({
        type: DELETE_COMMENT,
        payload: { id: commentId },
      })
      dispatch(setAlert('Comment Deleted', 'danger'))
    }
  } catch (err) {
    dispatch({
      type: DISCUSSION_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}
