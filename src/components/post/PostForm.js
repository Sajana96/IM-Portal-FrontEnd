import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'

const PostForm = (props) => {
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

  const onSubmit = (e) => {
    e.preventDefault()
    if (image === null) {
      return console.log('No Image')
    }
    if (!(image.type === 'image/jpeg' || image.type === 'image/png')) {
      return console.log('Unsupported Format')
    }
    console.log(image)
    console.log(formData)
  }

  return (
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

PostForm.propTypes = {}

export default PostForm
