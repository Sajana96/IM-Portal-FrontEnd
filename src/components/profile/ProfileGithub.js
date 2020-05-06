import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGitHubRepos } from '../../actions/profile'
import Spinner from '../layout/Spinner'

const ProfileGithub = ({ githubusername, getGitHubRepos, repos }) => {
  useEffect(() => {
    getGitHubRepos(githubusername)
  }, [getGitHubRepos, githubusername])
  return repos === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {repos.length > 0 ? (
        repos.map((repo) => (
          <div key={repo.id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge badge-light'>Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <h3>No github repos available</h3>
      )}
    </Fragment>
  )
}

ProfileGithub.propTypes = {
  getGitHubRepos: PropTypes.func.isRequired,
  githubusername: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
}
const mapStateToProps = (state) => ({
  repos: state.profile.repos,
})
export default connect(mapStateToProps, { getGitHubRepos })(ProfileGithub)
