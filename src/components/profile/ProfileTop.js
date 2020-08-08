import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({
  profile: { user, path, company, skills, hometown, social, telnumber },
}) => {
  return (
    <div
      className='profile-top bg-primary p-2'
      style={{ background: '#48495c' }}
    >
      <img className='round-img my-1' src={user && user.avatar} alt='' />
      <h1 className='large'>
        {user && user.name} - {user && user.category}
      </h1>
      <p className='lead'>Following {path}</p>
      {company ? <p className='lead'>Works at {company}</p> : ''}
      {hometown && <p>Lives in {hometown}</p>}
      {telnumber && <p>Contact: {telnumber}</p>}
      <div className='icons my-1'>
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  )
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileTop
