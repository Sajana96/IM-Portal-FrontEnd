import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}))

const SimpleExpansionPanel = ({ notices, loggedUser }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {notices &&
        notices.length > 0 &&
        notices.map((notice) => (
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id={notice._id}
            >
              <Typography className={classes.heading}>
                <h3>{notice.topic}</h3> To: <strong>{notice.group}</strong>
                <br></br>
                From: <strong>{notice.user.name}</strong>
                <h4>
                  <Moment format='MMM Do YYYY'>{notice.addedDate}</Moment>
                </h4>
                <Typography className={classes.secondaryHeading}>
                  {' '}
                  {loggedUser === notice.user._id && (
                    <button className='btn  btn-danger'>
                      <i className='fas fa-times'></i>
                    </button>
                  )}
                </Typography>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{notice.content}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
    </div>
  )
}
SimpleExpansionPanel.propTypes = {
  notices: PropTypes.array.isRequired,
  loggedUser: PropTypes.string.isRequired,
}
export default SimpleExpansionPanel
