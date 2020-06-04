import axios from 'axios'
import { GET_POSTS, GET_POST, POST_ERROR, CLEAR_SINGLE_POST } from './types'

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
