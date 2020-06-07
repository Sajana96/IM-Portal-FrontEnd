import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deletePost } from '../../actions/post'

const PostItem = ({
  post: { heading, subheading, user, _id, addedDate },
  loggedUser,
  deletePost,
}) => {
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
        <p className='post-date'>
          Posted on <Moment format='MMM Do YYYY'>{addedDate}</Moment>
        </p>

        <Link to={`/post/${_id}`} className='btn btn-dark'>
          Read More...
        </Link>
        {user && user._id === loggedUser._id && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={(e) => deletePost(_id)}
          >
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
  deletePost: PropTypes.func.isRequired,
}

export default connect(null, { deletePost })(PostItem)
