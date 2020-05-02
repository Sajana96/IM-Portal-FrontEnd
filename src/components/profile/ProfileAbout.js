import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile: { user, bio, skills, interests } }) => {
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          {' '}
          <h2 className='text-primary'>
            {user.name.trim().split(' ')[0]}'s Bio
          </h2>
          <p>{bio}</p>
          <div className='line'></div>
        </Fragment>
      )}
      {skills && skills.length > 0 && (
        <Fragment>
          {' '}
          <h2 className='text-primary'>Skill Set</h2>
          <div className='skills'>
            {skills.map((skill, index) => (
              <div key={index} className='p-1'>
                <i className='fa fa-check'></i> {skill}
              </div>
            ))}
          </div>
        </Fragment>
      )}
      {interests && interests.length > 0 && (
        <Fragment>
          <div className='line'></div>{' '}
          <h2 className='text-primary'>Interests</h2>
          <div className='skills'>
            {interests.map((interest, index) => (
              <div key={index} className='p-1'>
                <i className='fa fa-check'></i> {interest}
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileAbout
