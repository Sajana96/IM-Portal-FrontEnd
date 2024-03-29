import { SET_ALERT, REMOVE_ALERT } from '../actions/types'
import { v4 as uuidv4 } from 'uuid'

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuidv4()
  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      alertType,
      msg
    }
  })
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000)
}
