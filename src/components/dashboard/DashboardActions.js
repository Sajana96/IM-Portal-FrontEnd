import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary'></i> Add Experience
      </Link>
      <Link to='/add-interest' className='btn btn-light'>
        <i className='fas fa-star text-primary'></i> Add Interests
      </Link>
    </div>
  )
}

export default DashboardActions
