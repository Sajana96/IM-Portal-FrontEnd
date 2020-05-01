import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { getCurrentProfile } from '../../actions/profile'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'

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
      <div className='profile'>
        <img className='round-img' src={user.avatar} alt='' />
      </div>

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
        <Fragment>
          <DashboardActions id={user._id} />
          <Experience experience={profile.experience} />
        </Fragment>
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
