import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import discussion from './discussion'
import post from './post'
import notice from './notice'

export default combineReducers({
  alert,
  auth,
  profile,
  discussion,
  post,
  notice,
})
