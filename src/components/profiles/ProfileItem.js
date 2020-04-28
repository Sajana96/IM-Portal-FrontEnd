import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },

    path,
    company,
    hometown,
    skills
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

        <ul>
          {skills.length > 0 &&
            skills.slice(0, 4).map((skill, index) => (
              <li key={index} className='text-primary'>
                <i className='fas fa-check'></i> {skill}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object
}

export default ProfileItem
