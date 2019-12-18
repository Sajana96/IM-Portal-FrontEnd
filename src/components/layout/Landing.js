import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

const Landing = () => {
  const classes = useStyles()
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
export default Landing
