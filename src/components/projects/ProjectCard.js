import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import BlockIcon from '@material-ui/icons/Block'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { subscribe, unsubscribe } from '../../actions/project'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

const ProjectCard = ({ project, owner, unsubscribe, subscribe }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  //jk
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            {project.user.name.split('')[0]}
          </Avatar>
        }
        title={project.title}
        subheader={
          <p>
            host:{' '}
            <Link to={`/profile/${project.user._id}`}>
              <strong>{project.user.name}</strong>
            </Link>
          </p>
        }
      />

      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {project.description}
        </Typography>
        <strong>View github</strong>
        {'     '}
        <a href={project.github} target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-github fa-2x'></i>
        </a>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label='add to favorites'
          onClick={() => subscribe(project._id)}
        >
          <AssignmentTurnedInIcon />
        </IconButton>
        <IconButton
          aria-label='add to favorites'
          onClick={() => unsubscribe(project._id)}
        >
          <BlockIcon />
        </IconButton>
        {owner._id === project.user._id && (
          <Button
            variant='contained'
            color='secondary'
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        )}

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <strong>Interested</strong>
          <ul>
            {project &&
              project.interested.map((obj) => (
                <li key={obj._id}>
                  <Link to={`/profile/${obj.user._id}`}>
                    <h4>{obj.user.name}</h4>
                  </Link>
                </li>
              ))}
          </ul>
        </CardContent>
      </Collapse>
    </Card>
  )
}
ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  owner: PropTypes.object.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  owner: state.auth.user,
})
export default connect(mapStateToProps, { unsubscribe, subscribe })(ProjectCard)
