import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { blockUser } from '../../actions/admin'

const UserList = ({ users, blockUser }) => {
  const renderUsers = users.map((user) => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.category}</td>
      <td>
        {user.access ? (
          <button
            className='btn btn-danger'
            onClick={(e) => {
              blockUser(user._id)
            }}
          >
            Block
          </button>
        ) : (
          <button
            className='btn btn-success'
            onClick={(e) => {
              blockUser(user._id)
            }}
          >
            Unblock
          </button>
        )}
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th className='hide-sm'>E-mail</th>
            <th className='hide-sm'>Category</th>
            <th className='hide-sm'>Status</th>
          </tr>
        </thead>
        <tbody>{renderUsers}</tbody>
      </table>
    </Fragment>
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  blockUser: PropTypes.func.isRequired,
}

export default connect(null, { blockUser })(UserList)
