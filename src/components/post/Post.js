import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './Post.css'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const Post = ({ match, post: { loading, post }, getPost }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost])
  return post === null || loading ? (
    <Spinner />
  ) : (
    <div>
      <Link to='/posts' className='btn btn-light'>
        Back to Posts
      </Link>
      <header
        className='masthead'
        style={{
          backgroundImage: `url(${post.image})`,
        }}
      >
        <div className='overlay'></div>

        <div className='container'>
          <div className='row'>
            <div className='col-lg-8 col-md-10 mx-auto'>
              <div className='post-heading'>
                <h1>{post.heading}</h1>
                <h2 className='subheading'>{post.subheading}</h2>

                <span className='meta'>
                  Posted on{' '}
                  <Moment format='MMM Do YYYY'>{post.addedDate}</Moment>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 col-md-10 mx-auto'>
            <p>{post.content}</p>
            <br></br>
            <h3>
              Posted by{' '}
              <Link to={`/profile/${post.user._id}`}>{post.user.name}</Link>{' '}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  post: state.post,
})

export default connect(mapStateToProps, { getPost })(Post)
