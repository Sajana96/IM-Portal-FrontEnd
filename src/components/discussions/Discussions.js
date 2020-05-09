import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import DiscussionItem from './DiscussionItem'
import { getDiscussions, clearDiscussion } from '../../actions/discussion'
import { Redirect } from 'react-router-dom'

const Discussions = ({
  getDiscussions,
  user,
  discussion: { loading, discussions },
  clearDiscussion,
}) => {
  useEffect(() => {
    getDiscussions()
  }, [getDiscussions])
  if (user && user.category === 'Lecturer') {
    return <Redirect to='/dashboard' />
  }
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Discussions</h1>
      <p className='lead'>
        <i className='fas fa-question-circle'></i> Ask any question!
      </p>
      {/*Post form*/}
      <div className='posts'>
        {discussions.length > 0 ? (
          discussions.map((discussion) => (
            <DiscussionItem key={discussion._id} discussion={discussion} />
          ))
        ) : (
          <h3>No discussions</h3>
        )}
      </div>
    </Fragment>
  )
}

Discussions.propTypes = {
  discussion: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getDiscussions: PropTypes.func.isRequired,
  clearDiscussion: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  discussion: state.discussion,
})
export default connect(mapStateToProps, { getDiscussions, clearDiscussion })(
  Discussions
)
