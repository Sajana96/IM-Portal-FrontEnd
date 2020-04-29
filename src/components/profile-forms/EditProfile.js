import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter, Redirect } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import {
  createProfile,
  getCurrentProfile,
  addProfilePicture
} from '../../actions/profile'
import { setAlert } from '../../actions/alert'

const EditProfile = ({
  createProfile,
  getCurrentProfile,
  addProfilePicture,
  setAlert,
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
  const [profileImage, setProfileImage] = useState(null)
  const [pictureLoading, setPictureLoading] = useState(false)
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
      <h1 className='large text-primary'>Put up a Profile Image</h1>
      {pictureLoading ? (
        <h2>
          Uploading...
          <Spinner />
        </h2>
      ) : (
        ''
      )}
      <h2 className='form-text'>Please Select a jpeg or png file</h2>
      <form className='form'>
        <div className='form-group'>
          <input
            type='file'
            onChange={e => {
              setProfileImage(e.target.files[0])
            }}
          />
        </div>
        <input
          type='button'
          className='btn btn-primary my-1'
          value='Add Image'
          onClick={async e => {
            e.preventDefault()
            if (profileImage === null) {
              return setAlert('No Image', 'danger')
            }
            if (
              !(
                profileImage.type === 'image/jpeg' ||
                profileImage.type === 'image/png'
              )
            ) {
              return setAlert('Unsupported Format', 'danger')
            }
            setPictureLoading(true)
            console.log(profileImage)
            await addProfilePicture(profileImage, history)
            setPictureLoading(false)
          }}
        />
      </form>
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
      <hr></hr>
    </Fragment>
  )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  addProfilePicture: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  addProfilePicture,
  setAlert
})(withRouter(EditProfile))
