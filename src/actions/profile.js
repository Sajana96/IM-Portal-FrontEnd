import axios from 'axios'
import { setAlert } from './alert'
import { loadUser } from './auth'
import {
  GET_PROFILE,
  PROFILE_ERROR,
  EDIT_PROFILE,
  ADD_EXPERIENCE,
  GET_PROFILES,
  CLEAR_PROFILE,
  GET_REPOS
} from './types'

//Get the Current Profile
export const getCurrentProfile = () => async dispatch => {
  //dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get('/api/profile/me')
    dispatch({ type: GET_PROFILE, payload: res.data })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status }
    })
  }
}

//Create or Edit Profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/profile', formData, config)
    dispatch({ type: EDIT_PROFILE, payload: res.data })
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status }
    })
  }
}

//Add experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/experience', formData, config)
    dispatch({ type: ADD_EXPERIENCE, payload: res.data })
    dispatch(setAlert('Experience Added', 'success'))

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status }
    })
  }
}
//Delete Experience

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`)
    dispatch({ type: EDIT_PROFILE, payload: res.data })
    dispatch(setAlert('Experience Deleted', 'danger'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status }
    })
  }
}

// Get all Profiles
export const getAllProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get('/api/profile')
    dispatch({ type: GET_PROFILES, payload: res.data })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status }
    })
  }
}

// Get profile by user id
export const getOneUserProfile = userId => async dispatch => {
  console.log('this method got executed')
  try {
    const res = await axios.get(`/api/profile/user/${userId}`)
    dispatch({ type: GET_PROFILE, payload: res.data })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status }
    })
    dispatch(setAlert(err.response.data.msg, 'danger'))
  }
}

// Get github repos
export const getGitHubRepos = userName => async dispatch => {
  dispatch({ type: CLEAR_PROFILE })
  try {
    const res = await axios.get(`/api/profile/github/${userName}`)
    dispatch({ type: GET_REPOS, payload: res.data })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status }
    })
  }
}

export const addProfilePicture = (profileImage, history) => async dispatch => {
  try {
    const fd = new FormData()
    fd.append('image', profileImage, profileImage.name)

    const res = await axios.post('/api/profile/picture', fd)
    console.log(res.data)
    await dispatch(loadUser())
    dispatch(setAlert('Image Changed', 'success'))

    history.push('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
  }
}
