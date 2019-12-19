import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import AlertShow from '../layout/AlertShow'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const [alert, setAlert] = useState({
    show: false,
    type: '',
    message: ''
  })

  const { name, email, password, password2 } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if (password !== password2) {
      setAlert({
        show: true,
        type: 'danger',
        message: 'passwords do not match'
      })

      setTimeout(() => setAlert({ show: false }), 4000)
      return console.log('Passwords do not Match')
    }
    //setSuccess(true)

    //setTimeout(() => setSuccess(false), 5000)
    setAlert({
      show: true,
      type: 'success',
      message: 'User Added'
    })
    setTimeout(() => setAlert({ show: false }), 3000)
    const user = formData
    setFormData({ name: '', email: '', password: '', password2: '' })
    console.log(user)
  }

  return (
    <Fragment>
      <AlertShow alert={alert} />
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

export default Register
