import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import { addPost } from '../../actions/post'
import { withRouter } from 'react-router-dom'

const PostForm = ({ addPost, setAlert, history }) => {
  const [formData, setFormData] = useState({
    heading: '',
    subheading: '',
    content: '',
  })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { heading, subheading, content } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (image === null) {
      return setAlert('No Image', 'danger')
    }
    if (!(image.type === 'image/jpeg' || image.type === 'image/png')) {
      return setAlert('Unsupported image format', 'danger')
    }
    console.log(image)
    console.log(formData)
    setLoading(true)
    await addPost(formData, image, history)
  }

  return loading ? (
    <div>
      <h2>Posting...</h2>
      <Spinner />
    </div>
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Add Post</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Publish a blog post here
      </p>

      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Heading'
            name='heading'
            value={heading}
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Subheading'
            name='subheading'
            value={subheading}
            required
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='file'
            onChange={(e) => {
              setImage(e.target.files[0])
            }}
            required
          />
        </div>
        <div className='form-group'>
          <textarea
            name='content'
            cols='30'
            rows='25'
            placeholder='Write here....'
            value={content}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>

        <input type='submit' className='btn btn-success' value='Add' />
      </form>
    </Fragment>
  )
}

PostForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
}

export default connect(null, { setAlert, addPost })(withRouter(PostForm))
