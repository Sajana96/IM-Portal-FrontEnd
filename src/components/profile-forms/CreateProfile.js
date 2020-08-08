import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter, Redirect } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { createProfile, getCurrentProfile } from '../../actions/profile'
import { setAlert } from '../../actions/alert'

const CreateProfile = ({
  createProfile,
  history,
  profile: { profile, loading },
  getCurrentProfile,
  setAlert,
}) => {
  const [formData, setFormData] = useState({
    school: '',
    hometown: '',
    path: 'Management',
    skills: '',
    interests: '',
    bio: '',
    company: '',
    githubusername: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    instagram: '',
    telnumber: '',
  })
  const [displaySocial, toggleSocial] = useState(false)
  useEffect(() => {
    getCurrentProfile()
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
    instagram,
    telnumber,
  } = formData
  const regex = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(regex.test(telnumber))
    if (!regex.test(telnumber)) {
      return setAlert('Unsupported Format of Contact Number', 'danger')
    }
    console.log(formData)
    createProfile(formData, history)
  }
  if (profile !== null) return <Redirect to='/edit-profile' />
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>*required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select name='path' onChange={(e) => onChange(e)}>
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
            onChange={(e) => onChange(e)}
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
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>Could be your recent school</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Contact Number'
            name='telnumber'
            value={telnumber}
            required
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Number that others contact you ex: 0777123456
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Hometown'
            name='hometown'
            value={hometown}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>City suggested (eg. Moratuwa)</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
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
            onChange={(e) => onChange(e)}
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
            onChange={(e) => onChange(e)}
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
            onChange={(e) => onChange(e)}
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
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default connect((state) => ({ profile: state.profile }), {
  createProfile,
  getCurrentProfile,
  setAlert,
})(withRouter(CreateProfile))
