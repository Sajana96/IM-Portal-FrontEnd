import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNotice } from '../../actions/notice'

const NoticeForm = ({ addNotice, user }) => {
  const [formData, setFormData] = useState({
    topic: '',
    group: 'All',
    content: '',
  })
  const { topic, content, group } = formData
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    await addNotice(formData, user)
    setFormData({ topic: '', content: '' })
  }
  return (
    <div className='post-form'>
      <form className='form my-1' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Heading'
            name='topic'
            onChange={(e) => onChange(e)}
            value={topic}
            required
          />
        </div>
        <strong>Select the group of students</strong>
        <div className='form-group'>
          <select name='group' required onChange={(e) => onChange(e)}>
            <option value='All'>All</option>
            <option value='Level 1'>Level 1</option>
            <option value='Level 2'>Level 2</option>
            <option value='Level 3'>Level 3</option>
            <option value='Level 4'>Level 4</option>
          </select>
        </div>
        <textarea
          name='content'
          cols='30'
          rows='5'
          placeholder='Write the message'
          required
          onChange={(e) => onChange(e)}
          value={content}
        ></textarea>
        <input type='submit' className='btn btn-success my-1' value='Submit' />
      </form>
    </div>
  )
}

NoticeForm.propTypes = {
  addNotice: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(null, { addNotice })(NoticeForm)
