import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import DiscussionBody from './DiscussionBody'
import CommentItem from './CommentItem'
import { Redirect, Link } from 'react-router-dom'
import { getDiscussion } from '../../actions/discussion'

const Discussion = ({
  user,
  discussion: { discussion },
  getDiscussion,
  match,
}) => {
  useEffect(() => {
    getDiscussion(match.params.id)
  }, [getDiscussion])
  if (user && user.category === 'Lecturer') {
    return <Redirect to='/dashboard' />
  }
  return discussion === null ? (
    <Spinner />
  ) : (
    <div>
      <Link to='/discussions' className='btn'>
        Back To Discussions
      </Link>
      <DiscussionBody discussion={discussion} />
      {discussion && discussion.comments.length > 0 ? (
        <div className='comments'>
          {discussion &&
            discussion.comments.map((comment) => (
              <CommentItem
                comment={comment}
                discussionId={discussion._id}
                owner={discussion.user._id}
              />
            ))}
        </div>
      ) : (
        <Fragment>No Comments</Fragment>
      )}
    </div>
  )
}

Discussion.propTypes = {
  user: PropTypes.object.isRequired,
  discussion: PropTypes.object.isRequired,
  getDiscussion: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  discussion: state.discussion,
})
export default connect(mapStateToProps, { getDiscussion })(Discussion)
