import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getCurrentProfile } from '../../actions/profile'
import { connect } from 'react-redux'

const Dashboard = ({ auth, profile, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])
  return <div>Dashboard</div>
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
