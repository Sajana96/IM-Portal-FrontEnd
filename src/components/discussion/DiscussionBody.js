import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const DiscussionBody = ({
  discussion: { content, user, area, comments, likes },
}) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user._id}`}>
          <img className='round-img' src={user.avatar} alt='' />
          <h4>{user.name}</h4>
        </Link>
      </div>
      <div>
        <strong>Category: {area}</strong>
        <p className='my-1'>{content}</p>
      </div>
    </div>
  )
}

DiscussionBody.propTypes = {
  discussion: PropTypes.object.isRequired,
}

export default DiscussionBody
