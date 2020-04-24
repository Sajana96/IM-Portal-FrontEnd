import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter, Redirect } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { createProfile, getCurrentProfile } from '../../actions/profile'

const EditProfile = ({
  createProfile,
  getCurrentProfile,
  history,
  profile: { profile, loading }
}) => {
  const [formData, setFormData] = useState({
    school: '',
    hometown: '',
    path: '',
    skills: '',
    interests: '',
    bio: '',
    company: '',
    githubusername: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    instagram: ''
  })
  const [displaySocial, toggleSocial] = useState(false)
  useEffect(() => {
    getCurrentProfile()
    setFormData({
      school: loading || !profile.school ? '' : profile.school,
      hometown: loading || !profile.hometown ? '' : profile.hometown,
      path: loading || !profile.path ? '' : profile.path,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      interests:
        loading || !profile.interests ? '' : profile.interests.join(','),
      bio: loading || !profile.bio ? '' : profile.bio,
      company: loading || !profile.company ? '' : profile.company,
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    })
  }, [loading])

  const {
    school,
    hometown,
    path,
    skills,
    interests,
    bio,
    company,
    githubusername,
    facebook,
    youtube,
    linkedin,
    instagram
  } = formData

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    console.log(formData)
    createProfile(formData, history, true)
  }
  if (profile === null) return <Redirect to='/create-profile' />
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>*required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select name='path' onChange={e => onChange(e)}>
            <option value='Management'>Management</option>
            <option value='Information Technology'>
              Information Technology
            </option>
            <option value='Employeed'>Employeed</option>
            <option value='Instructor'>Instructor or Lecturer</option>
          </select>
          <small className='form-text'>
            Please mention your path if you are an undergraduate or mention your
            status
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='School'
            name='school'
            value={school}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Could be your recent school</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Hometown'
            name='hometown'
            value={hometown}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>City suggested (eg. Moratuwa)</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Interests'
            name='interests'
            value={interests}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (eg. Programming, Networking, Big
            Data )
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={e => onChange(e)}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            type='button'
            className='btn btn-dark'
            onClick={() => toggleSocial(!displaySocial)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocial ? (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
)