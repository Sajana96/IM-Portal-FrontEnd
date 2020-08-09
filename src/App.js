import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import Discussions from './components/discussions/Discussions'
import Discussion from './components/discussion/Discussion'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import PostForm from './components/post/PostForm'
import Notices from './components/notices/Notices'
import Projects from './components/projects/Projects'
import UsersTable from './components/profiles/UsersTable'
import Admin from './components/admin/Admin'
import PrivateRoute from './components/routing/PrivateRoute'
import Reports from './components/admin/Reports'
import AdminRoute from './components/routing/AdminRoute'
import AlertShow from './components/layout/AlertShow'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'

//Redux
import { Provider } from 'react-redux'
import store from './store'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />

          <section className='container'>
            <AlertShow />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              />
              <PrivateRoute exact path='/discussions' component={Discussions} />
              <PrivateRoute
                exact
                path='/discussion/:id'
                component={Discussion}
              />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/post/:id' component={Post} />
              <PrivateRoute exact path='/add-post' component={PostForm} />
              <PrivateRoute exact path='/notices' component={Notices} />
              <PrivateRoute exact path='/projects' component={Projects} />
              <PrivateRoute exact path='/users' component={UsersTable} />
              <PrivateRoute exact path='/admin' component={Admin} />
              <PrivateRoute exact path='/admin/reports' component={Reports} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
