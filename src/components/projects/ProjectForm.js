import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addProject } from '../../actions/project'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
})

const ProjectForm = ({ owner, addProject }) => {
  const classes = useStyles()
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }
  const [formData, setFormData] = React.useState({
    title: '',
    github: '',
    description: '',
  })
  const { title, github, description } = formData
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    if (title === '' || github === '') return console.log('Incomplete')
    console.log(formData)
    await addProject(owner, formData)
    setFormData({ title: '', github: '', description: '' })
    setState({ ...state, bottom: false })
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'
    >
      <List>
        <ListItem>
          <h2>Add a Project</h2>
        </ListItem>
        <Divider />
        <ListItem>
          <form className='form my-1' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Title of the Projects'
                name='title'
                required
                value={title}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Github Link of the Project'
                name='github'
                required
                value={github}
                onChange={(e) => onChange(e)}
              />
            </div>
            <textarea
              name='description'
              cols='30'
              rows='5'
              placeholder='Description of the Project'
              required
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
            <input type='submit' className='btn btn-dark my-1' value='Add' />
          </form>
        </ListItem>
      </List>
    </div>
  )

  return (
    <div>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <h4>Add +</h4>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
ProjectForm.propTypes = {
  owner: PropTypes.object.isRequired,
  addProject: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  owner: state.auth.user,
})
export default connect(mapStateToProps, { addProject })(ProjectForm)
