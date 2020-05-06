import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOneUserProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileGithub from './ProfileGithub'

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
      <div className='profile-exp bg-white p-2'>
        <h2 className='text-primary'>Experience</h2>
        {profile.experience.length > 0 ? (
          <Fragment>
            {profile.experience.map((exp) => (
              <ProfileExperience key={exp._id} experience={exp} />
            ))}
          </Fragment>
        ) : (
          <h3>No Profile Credentials</h3>
        )}
      </div>
      <div className='profile-github'>
        <h2 className='text-primary my-1'>
          <i className='fab fa-github'></i> Github Repos
        </h2>
        {profile.githubusername ? (
          <ProfileGithub githubusername={profile.githubusername} />
        ) : (
          //<strong>This is terminated due to headers issue in github api</strong>
          <h3>Please update your github username</h3>
        )}
      </div>
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
