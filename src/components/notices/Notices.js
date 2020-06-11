import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import SimpleExapansionPanel from './SimpleExpansionPanel'
import { connect } from 'react-redux'
import { getNotices } from '../../actions/notice'
import Spinner from '../layout/Spinner'
import NoticeForm from './NoticeForm'

const Notices = ({
  getNotices,
  notice: { notices, loading },
  auth: { user },
}) => {
  useEffect(() => {
    getNotices()
  }, [getNotices])

  const [showForm, setShowForm] = useState(false)
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <h1 className='large text-primary'>Notices</h1>
      <p className='lead'>
        <i className='fas fa-sticky-note'></i> Make note!!!
      </p>
      <div className='my-2'>
        <button
          type='button'
          className='btn btn-dark'
          onClick={(e) => setShowForm(!showForm)}
        >
          Add Notice
        </button>
      </div>
      {showForm && (
        <Fragment>
          <NoticeForm user={user} />
        </Fragment>
      )}
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
