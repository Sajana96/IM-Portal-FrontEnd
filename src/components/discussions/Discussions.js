import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import DiscussionItem from './DiscussionItem'
import DiscussionForm from './DiscussionForm'
import {
  getDiscussions,
  clearDiscussion,
  searchDiscussion,
} from '../../actions/discussion'
import { Redirect } from 'react-router-dom'

const Discussions = ({
  getDiscussions,
  user,
  discussion: { loading, discussions },
  searchDiscussion,
  clearDiscussion,
}) => {
  //Search Component stuff
  var typingTimer
  const [loadingSpinner, setLoadingSpinner] = useState(false)
  const [query, setQuery] = useState('')
  const onSearch = (e) => {
    setQuery(e.target.value)
  }
  const onSearchChange = (e) => {
    setLoadingSpinner(true)
    clearTimeout(typingTimer)

    typingTimer = setTimeout(async () => {
      if (query !== '') {
        console.log(query)
        await searchDiscussion(query)
        return setLoadingSpinner(false)
      }
      await getDiscussions()
      setLoadingSpinner(false)
    }, 1200)
  }

  useEffect(() => {
    getDiscussions()
  }, [getDiscussions])
  if (user && user.category === 'Lecturer') {
    return <Redirect to='/dashboard' />
  }
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Discussions</h1>
      <p className='lead'>
        <i className='fas fa-question-circle'></i> Ask any question!
      </p>

      <DiscussionForm user={user} />
      <p className='lead'>
        <i className='fas fa-search'></i>
        Search for discussions...
      </p>
      <div className='form my-1 form-group'>
        <input
          type='text'
          placeholder='Search Here'
          name='query'
          value={query}
          onChange={(e) => onSearch(e)}
          onKeyUp={(e) => onSearchChange(e)}
          onKeyDown={() => clearTimeout(typingTimer)}
        />
        {loadingSpinner ? <Spinner /> : ''}
      </div>

      <div className='posts'>
        {discussions.length > 0 ? (
          discussions.map((discussion) => (
            <DiscussionItem key={discussion._id} discussion={discussion} />
          ))
        ) : (
          <h3>No discussions</h3>
        )}
      </div>
    </Fragment>
  )
}

Discussions.propTypes = {
  discussion: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getDiscussions: PropTypes.func.isRequired,
  clearDiscussion: PropTypes.func.isRequired,
  searchDiscussion: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  discussion: state.discussion,
})
export default connect(mapStateToProps, {
  getDiscussions,
  clearDiscussion,
  searchDiscussion,
})(Discussions)
