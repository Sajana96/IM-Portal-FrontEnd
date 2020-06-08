import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import SimpleExapansionPanel from './SimpleExpansionPanel'
import { connect } from 'react-redux'
import { getNotices } from '../../actions/notice'
import Spinner from '../layout/Spinner'

const Notices = ({
  getNotices,
  notice: { notices, loading },
  auth: { user },
}) => {
  useEffect(() => {
    getNotices()
  }, [getNotices])
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <h1 className='large text-primary'>Notices</h1>
      <p className='lead'>
        <i className='fab fa-blogger'></i> Make note!!!
      </p>
      <SimpleExapansionPanel notices={notices} loggedUser={user._id} />
    </div>
  )
}

Notices.propTypes = {
  getNotices: PropTypes.func.isRequired,
  notice: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  notice: state.notice,
  auth: state.auth,
})

export default connect(mapStateToProps, { getNotices })(Notices)
