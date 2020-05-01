import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { getAllProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profile = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles()
  }, [])
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Users</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i> Browse and Connect with Fellow
        Collegues
      </p>
      <div className='profiles'>
        {profiles.length > 0 ? (
          profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <h4>No profiles...</h4>
        )}
      </div>
    </Fragment>
  )
}
Profile.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})
export default connect(mapStateToProps, { getAllProfiles })(Profile)
