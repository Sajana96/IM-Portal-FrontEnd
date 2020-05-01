import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },

    path,
    company,
    hometown,
    skills,
    interests
  }
}) => {
  return (
    <div className='profiles'>
      <div className='profile bg-light'>
        <img className='round-img' src={avatar} alt='' />
        <div>
          <h2>{name}</h2>
          <p>{path}</p>
          <p>{hometown}</p>
          {company && <p>Works at {company}</p>}
          <Link to={`/profile/${_id}`} className='btn btn-primary'>
            View Profile
          </Link>
        </div>
        <div>
          <div>
            <h3>Skiils</h3>
            <ul>
              {skills.length > 0 &&
                skills.slice(0, 4).map((skill, index) => (
                  <li key={index} className='text-primary'>
                    <i className='fas fa-check'></i> {skill}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            {' '}
            <h3>Interests</h3>
            <ul>
              {interests.length > 0 &&
                interests.slice(0, 4).map((interest, index) => (
                  <li key={index} className='text-primary'>
                    <i className='fas fa-check'></i> {interest}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object
}

export default ProfileItem
