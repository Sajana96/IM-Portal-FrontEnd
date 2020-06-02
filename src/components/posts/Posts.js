import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'

const Posts = ({ getPosts, post: { posts, loading }, user }) => {
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
        {loading ? (
          <Spinner />
        ) : posts && posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} loggedUser={user} />
            ))}
          </div>
        ) : (
          <h2>No Posts</h2>
        )}
      </div>
    </Fragment>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  post: state.post,
  user: state.auth.user,
})
export default connect(mapStateToProps, { getPosts })(Posts)
