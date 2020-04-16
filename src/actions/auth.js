import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types'
import axios from 'axios'
import { setAlert } from './alert'

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
    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        token: res.data
      }
    })
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
