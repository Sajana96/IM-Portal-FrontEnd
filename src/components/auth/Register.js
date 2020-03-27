import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import AlertShow from '../layout/AlertShow'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    category: 'Level 1'
  })

  const [alert, setAlert] = useState({
    show: false,
    type: '',
    message: ''
  })

  const { name, email, password, password2, category } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const SelectUser = props => {
    if (props.userType == 'Student') {
      return (
        <div className='form-group'>
          <input
            type='text'
            placeholder='Please enter your Current IM Number'
            name='confirmtionField'
            required
          />
        </div>
      )
    } else if (props.userType == 'Lecturer') {
      return (
        <div className='form-group'>
          <input
            type='text'
            placeholder='Please enter your Lecturer Email'
            name='confirmtionField'
            required
          />
        </div>
      )
    } else if (props.userType == 'Past Student') {
      return (
        <div className='form-group'>
          <input
            type='text'
            placeholder='Please enter your Past IM Number'
            name='confirmtionField'
            required
          />
        </div>
      )
    } else return <div></div>
  }

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
    setFormData({
      name: '',
      email: '',
      password: '',
      password2: '',
      category: 'Student'
    })
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
          <select
            name='category'
            value={category}
            onChange={e => onChange(e)}
            required
          >
            <option value='level1'>Level 1</option>
            <option value='level2'>Level 2</option>
            <option value='level3'>Level 3</option>
            <option value='level4'>Level 4</option>
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

        <SelectUser userType={category} />

        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account?<Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  )
}

export default Register
