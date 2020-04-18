import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

const Landing = ({ auth }) => {
  const classes = useStyles()
  if (auth.isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>IM Portal</h1>
          <p className='lead'>
            Create a user profile/portfolio, share posts and get help from other
            users.
          </p>
          <div className={classes.root}>
            <Link to='/register'>
              <Button variant='contained' color='primary'>
                Register
              </Button>
            </Link>

            <Link to='/login'>
              <Button variant='contained' color='secondary'>
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(Landing)
