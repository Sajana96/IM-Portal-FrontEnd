import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import ProjectCard from './ProjectCard'
import ProjectForm from './ProjectForm'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { getProjects } from '../../actions/project'
import Spinner from '../layout/Spinner'

const Projects = ({ getProjects, project: { projects, loading } }) => {
  useEffect(() => {
    getProjects()
  }, [getProjects])
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Projects</h1>
      <hr></hr>
      <ProjectForm />
      <Grid container justify='space-around' spacing={5}>
        {projects &&
          projects.length !== 0 &&
          projects.map((eachProject) => (
            <Grid key={eachProject._id} item>
              <ProjectCard project={eachProject} />
            </Grid>
          ))}
      </Grid>
    </Fragment>
  )
}

Projects.propTypes = {
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  project: state.project,
})
export default connect(mapStateToProps, { getProjects })(Projects)
