import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'
import axios from 'axios'

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    category: 'Level 1'
  })

  const { name, email, password, password2, category } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    if (password !== password2) {
      return setAlert('Passwords Do Not Match', 'danger')
    }
    /*
    const newUser = { name, email, password, category }
    setFormData({
      name: '',
      email: '',
      password: '',
      password2: '',
      category: 'Level 1'
    })
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const body = JSON.stringify(newUser)

      const res = await axios.post('/api/users', body, config)
      console.log(res.data)
    } catch (error) {
      console.error(error.response.data)
    }*/
    setAlert('User Registered', 'success')
    console.log(formData)
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            required
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <select
            name='category'
            value={category}
            onChange={e => onChange(e)}
            required
          >
            <option value='level 1'>Level 1</option>
            <option value='level 2'>Level 2</option>
            <option value='level 3'>Level 3</option>
            <option value='level 4'>Level 4</option>
            <option value='Lecturer'>Lecturer</option>
            <option value='Past Student'>Past Student</option>
          </select>
        </div>

        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account?<Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  )
}
Register.propTypes = {
  setAlert: PropTypes.func.isRequired
}

export default connect(null, {
  setAlert
})(Register)
