import axios from 'axios'
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  CLEAR_SINGLE_POST,
  ADD_POST,
  DELETE_POST,
} from './types'
import { setAlert } from './alert'

//Get all post
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/post')

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}

export const getPost = (postId) => async (dispatch) => {
  dispatch({ type: CLEAR_SINGLE_POST })
  try {
    const res = await axios.get(`/api/post/${postId}`)

    dispatch({
      type: GET_POST,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}

export const addPost = (formData, image, history) => async (dispatch) => {
  try {
    const fd = new FormData()
    fd.append('image', image, image.name)
    fd.append('heading', formData.heading)
    fd.append('subheading', formData.subheading)
    fd.append('content', formData.content)

    const res = await axios.post('/api/post', fd)
    console.log(res.data)

    dispatch(setAlert('Post Added', 'success'))

    history.push('/posts')
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    })
  }
}

export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/post/${postId}`)
    console.log(res.data.msg)
    dispatch({ type: DELETE_POST, payload: postId })
    dispatch(setAlert('Post Deleted', 'danger'))
  } catch (err) {
    console.log('catch is running')
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    })
  }
}
