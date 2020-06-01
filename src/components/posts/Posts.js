import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import { Link } from 'react-router-dom'

const Posts = ({ getPosts }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])
  return (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fab fa-blogger'></i> Put Your Blog Posts Here!!!
      </p>
      <div className='dash-buttons'>
        <Link to='/add-post' className='btn btn-light'>
          <i className='fab fa-blogger'></i> Add a blog post
        </Link>
      </div>
      <div className='posts'>
        <div className='post bg-white p-1 my-1'>
          <div>
            <a href='profile.html'>
              <img
                className='round-img'
                src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
                alt=''
              />
              <h4>John Doe</h4>
            </a>
          </div>
          <div>
            <p className='my-1'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              possimus corporis sunt necessitatibus! Minus nesciunt soluta
              suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
              dolor? Illo perferendis eveniet cum cupiditate aliquam?
            </p>
            <p className='post-date'>Posted on 04/16/2019</p>

            <a href='post.html' className='btn btn-dark'>
              Read More...
            </a>
            <button type='button' className='btn btn-danger'>
              <i className='fas fa-times'></i>
            </button>
          </div>
        </div>

        <div className='post bg-white p-1 my-1'>
          <div>
            <a href='profile.html'>
              <img
                className='round-img'
                src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
                alt=''
              />
              <h4>John Doe</h4>
            </a>
          </div>
          <div>
            <p className='my-1'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              possimus corporis sunt necessitatibus! Minus nesciunt soluta
              suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
              dolor? Illo perferendis eveniet cum cupiditate aliquam?
            </p>
            <p className='post-date'>Posted on 04/16/2019</p>

            <a href='post.html' className='btn btn-dark'>
              Read More...
            </a>
            <button type='button' className='btn btn-danger'>
              <i className='fas fa-times'></i>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
}

export default connect(null, { getPosts })(Posts)
