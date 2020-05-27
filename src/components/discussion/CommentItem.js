import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { markComment, deleteComment } from '../../actions/discussion'

const CommentItem = ({
  comment: { date, _id, text, user, selected },
  auth,
  markComment,
  discussionId,
  owner,
  deleteComment,
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        {selected ? (
          <strong>
            Selected by Publisher <i className='fas fa-star'></i>
            {auth && auth.user._id === owner && (
              <small
                onClick={(e) => markComment(discussionId, _id)}
                style={{ cursor: 'pointer' }}
              >
                Unselect
              </small>
            )}
          </strong>
        ) : (
          auth &&
          auth.user._id === owner && (
            <div>
              {' '}
              <button
                type='button'
                className='btn btn-success'
                style={{ borderRadius: '70px' }}
                onClick={(e) => markComment(discussionId, _id)}
              >
                <i className='fas fa-star'></i>
              </button>
            </div>
          )
        )}
        <Link to={`/profile/${user._id}`}>
          <img className='round-img' src={user.avatar} alt='' />
          <h4>{user.name}</h4>
        </Link>
      </div>

      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on {<Moment format='MMM Do YYYY'>{date}</Moment>}
        </p>
        {auth && auth.user._id === user._id && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={(e) => deleteComment(discussionId, _id)}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  markComment: PropTypes.func.isRequired,
  discussionId: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})
export default connect(mapStateToProps, { markComment, deleteComment })(
  CommentItem
)
