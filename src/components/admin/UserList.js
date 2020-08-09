import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { blockUser } from '../../actions/admin'
import Spinner from '../layout/Spinner'

const UserList = ({ users, blockUser }) => {
  const [ready, setReady] = useState(false)
  const renderUsers = users.map((user) => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.category}</td>
      <td>{user.access ? 'Authorized' : 'Blocked'}</td>
      <td>
        {user.access ? (
          ready ? (
            <Spinner />
          ) : (
            <button
              className='btn btn-danger'
              onClick={async (e) => {
                setReady(true)
                await blockUser(user._id)
                setReady(false)
              }}
            >
              Block
            </button>
          )
        ) : ready ? (
          <Spinner />
        ) : (
          <button
            className='btn btn-success'
            onClick={async (e) => {
              setReady(true)
              await blockUser(user._id)
              setReady(false)
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
            <th className='hide-sm'>Name</th>
            <th className='hide-sm'>E-mail</th>
            <th className='hide-sm'>Category</th>
            <th className='hide-sm'>Status</th>
            <th className='hide-sm'>Action</th>
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
