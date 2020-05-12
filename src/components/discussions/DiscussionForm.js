import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addDiscussion } from '../../actions/discussion'

const DiscussionForm = ({ addDiscussion, user }) => {
  const [formData, setFormData] = useState({
    area: '',
    content: '',
  })
  const { area, content } = formData
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (area === '' || content === '') return console.log('Incomplete')
    console.log(formData)
    addDiscussion(formData, user)
    setFormData({ area: '', content: '' })
  }
  return (
    <div className='post-form' style={{ backgroundColor: '#c0e3f0' }}>
      <div className='bg-primary p'>
        <h3>Ask Something...</h3>
      </div>
      <form className='form my-1' onSubmit={(e) => onSubmit(e)}>
        <small>
          <strong>
            * Required Field. Please fill this to reach the question to relevant
            parties
          </strong>
        </small>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Question based Area'
            name='area'
            value={area}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <textarea
          name='content'
          value={content}
          onChange={(e) => onChange(e)}
          cols='30'
          rows='5'
          placeholder='Publish a Discussion'
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  )
}

DiscussionForm.propTypes = {
  addDiscussion: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(null, { addDiscussion })(DiscussionForm)
