import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOneUserProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'

const Profile = ({
  match,
  auth,
  profile: { profile, loading },
  getOneUserProfile,
}) => {
  useEffect(() => {
    getOneUserProfile(match.params.id)
  }, [getOneUserProfile, match.params.id])
  return profile === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/profiles' className='btn btn-light'>
        Back to Profiles
      </Link>
      {auth.user && profile.user._id === auth.user._id ? (
        <Link to='/edit-profile' className='btn btn-dark'>
          Edit Profile
        </Link>
      ) : (
        ''
      )}

      <ProfileTop profile={profile} />
      <ProfileAbout profile={profile} />
    </Fragment>
  )
}

Profile.propTypes = {
  getOneUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})
export default connect(mapStateToProps, { getOneUserProfile })(Profile)
