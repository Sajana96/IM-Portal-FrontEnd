import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../actions/types'
import axios from 'axios'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'
import store from '../store'

//Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get('/api/auth')
    dispatch({
      type: LOAD_USER,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

//Login User

export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ email, password })
  try {
    const res = await axios.post('/api/auth', body, config)
    console.log(res.data)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: res.data.token
      }
    })
    console.log('came before load user')
    await dispatch(loadUser())

    const appState = store.getState()
    console.log(appState)
    dispatch(setAlert(`Welcome ${appState.auth.user.name}`, 'primary'))
  } catch (err) {
    console.log('catch is running')
    console.log(err)
    const errors = err.response.data.errors
    //console.log(errors)
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

//Register User
export const register = ({
  name,
  email,
  password,
  category
}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ name, email, password, category })
  try {
    const res = await axios.post('/api/users', body, config)
    console.log(res.data)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        token: res.data.token
      }
    })
    dispatch(loadUser())
    dispatch(setAlert('User Registered', 'success'))
  } catch (err) {
    const errors = err.response.data.errors
    console.log(errors)
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

//Logout User
export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT
  })
}
