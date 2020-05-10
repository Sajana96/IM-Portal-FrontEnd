import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike } from '../../actions/discussion'

const DiscussionItem = ({
  discussion: { user, content, addedDate, comments, likes, area, _id },
  auth,
  addLike,
  removeLike,
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
        <strong>Category: {area}</strong>
        <p className='my-1'>{content}</p>
        <p className='post-date'>
          Posted on <Moment format='MMM Do YYYY'>{addedDate}</Moment>
        </p>
        <button
          onClick={(e) => addLike(_id)}
          type='button'
          className='btn btn-light'
        >
          <i className='fas fa-thumbs-up'></i>
          {likes.length > 0 && <span>{likes.length}</span>}
        </button>
        <button
          onClick={(e) => removeLike(_id)}
          type='button'
          className='btn btn-light'
        >
          <i className='fas fa-thumbs-down'></i>
        </button>
        <a href='post.html' className='btn btn-primary'>
          Discussion{' '}
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </a>
        {auth && auth.user._id === user._id && (
          <button type='button' className='btn btn-danger'>
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  )
}

DiscussionItem.propTypes = {
  discussion: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})
export default connect(mapStateToProps, { addLike, removeLike })(DiscussionItem)
