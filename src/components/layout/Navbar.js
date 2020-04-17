import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth, logout }) => {
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Community</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  )
  const lecturerLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Community</Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  )
  const studentLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Community</Link>
      </li>

      <li>
        <Link to='/login'>Discussions</Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  )
  const Display = props => {
    if (!props.auth.loading) {
      if (
        props.auth.isAuthenticated &&
        props.auth.user &&
        props.auth.user.category == 'Lecturer'
      )
        return <Fragment>{lecturerLinks}</Fragment>
      if (
        props.auth.isAuthenticated &&
        props.auth.user &&
        props.auth.user.category != 'Lecturer'
      )
        return <Fragment>{studentLinks}</Fragment>
      if (!props.auth.isAuthenticated) return <Fragment>{guestLinks}</Fragment>
    }
    return <Fragment></Fragment>
  }

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa fa-graduation-cap'></i> IM Portal
        </Link>
      </h1>
      <Display auth={auth} />
    </nav>
  )
}
Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logout })(Navbar)
