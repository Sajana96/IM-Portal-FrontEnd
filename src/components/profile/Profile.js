import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getOneUserProfile, getAllProfiles } from '../../actions/profile'
import Spinner from '../layout/Spinner'

const Profile = ({
  match,
  auth,
  profile: { profile, loading },
  getOneUserProfile
}) => {
  useEffect(() => {
    getOneUserProfile(match.params.id)
  }, [getAllProfiles])
  return profile === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>{profile.user.name}</Fragment>
  )
}

Profile.propTypes = {
  getOneUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
export default connect(mapStateToProps, { getOneUserProfile })(Profile)
