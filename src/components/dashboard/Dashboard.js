import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { getCurrentProfile } from '../../actions/profile'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

const Dashboard = ({
  auth: { user },
  profile: { loading, profile },
  getCurrentProfile
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name} -
        {user && user.category}
      </p>
      {profile === null ? (
        <Fragment>
          <p>
            You have not initialized a profile yet, please create a profile!!
          </p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      ) : (
        <Fragment>Has</Fragment>
      )}
    </Fragment>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
