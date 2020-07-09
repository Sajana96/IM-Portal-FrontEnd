import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getAllUsers } from '../../actions/admin'

const Admin = ({ user, getAllUsers }) => {
  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])
  if (user && user.category !== 'admin') {
    return <Redirect to='/dashboard' />
  }

  return user ? (
    <div>
      <h2>Admin Route</h2>
    </div>
  ) : (
    <Spinner />
  )
}

Admin.propTypes = {
  user: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
})
export default connect(mapStateToProps, { getAllUsers })(Admin)
