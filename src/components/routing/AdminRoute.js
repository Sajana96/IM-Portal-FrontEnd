import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !auth.isAuthenticated &&
      !auth.loading &&
      auth.user.category !== 'admin' ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
)
AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(AdminRoute)
