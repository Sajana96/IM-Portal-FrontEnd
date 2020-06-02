import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const PostItem = ({ post: { heading, subheading, user }, loggedUser }) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user._id}`}>
          <img className='round-img' src={user.avatar} alt='' />
          <h4>{user.name}</h4>
        </Link>
      </div>
      <div>
        <h2>{heading}</h2>
        <h3>{subheading}</h3>
        <p className='my-1'>Read more............</p>
        <p className='post-date'>Posted on 04/16/2019</p>

        <Link to={`/post`} className='btn btn-dark'>
          Read More...
        </Link>
        {user && user._id === loggedUser._id && (
          <button type='button' className='btn btn-danger'>
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,
}

export default PostItem
