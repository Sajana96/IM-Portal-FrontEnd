import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getAllUsers } from '../../actions/admin'
import UserList from './UserList'

const Admin = ({ user, getAllUsers, systemUsers }) => {
  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])
  if (user && user.category !== 'admin') {
    return <Redirect to='/dashboard' />
  }

  return user ? (
    <div>
      <h2>Current Users</h2>
      <Link to='/admin/reports' className='btn btn-dark'>
        <i className='far fa-chart-bar'></i> Go to Report Generation
      </Link>
      <UserList users={systemUsers} />
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
  systemUsers: state.admin.users,
})
export default connect(mapStateToProps, { getAllUsers })(Admin)
