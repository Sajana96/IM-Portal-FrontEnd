import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import discussion from './discussion'
import post from './post'
import notice from './notice'
import admin from './admin'
import project from './project'

export default combineReducers({
  alert,
  auth,
  profile,
  discussion,
  post,
  notice,
  admin,
  project,
})
