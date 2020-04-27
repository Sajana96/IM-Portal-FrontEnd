import React from 'react'
import PropTypes from 'prop-types'

const ProfileItem = ({ profile }) => {
  return <div>{profile.user.name}</div>
}

ProfileItem.propTypes = {
  profile: PropTypes.object
}

export default ProfileItem
