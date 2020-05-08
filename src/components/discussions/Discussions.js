import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getDiscussions } from '../../actions/discussion'
import { Redirect } from 'react-router-dom'

const Discussions = ({
  getDiscussions,
  user,
  discussion: { loading, discussions },
}) => {
  useEffect(() => {
    getDiscussions()
  }, [getDiscussions])
  if (user && user.category === 'Lecturer') return <Redirect to='/dashboard' />
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <p>{discussions.length}</p>
    </Fragment>
  )
}

Discussions.propTypes = {
  discussion: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getDiscussions: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  discussion: state.discussion,
})
export default connect(mapStateToProps, { getDiscussions })(Discussions)
