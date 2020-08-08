import React, { useEffect } from 'react'
import MaterialTable from 'material-table'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { getAllProfiles } from '../../actions/profile'
import { useHistory } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const UsersTable = ({ getAllProfiles, profile: { profiles, loading } }) => {
  const history = useHistory()
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Level', field: 'category' },
      { title: 'Contact info', field: 'telnumber' },
    ],
  })
  useEffect(() => {
    getAllProfiles()
  }, [])

  console.log(state)
  return loading ? (
    <Spinner />
  ) : (
    <MaterialTable
      title='Find Anyone'
      columns={state.columns}
      data={profiles.map((obj) => {
        return {
          id: obj.user._id,
          name: obj.user.name,
          category: obj.user.category,
          telnumber: obj.telnumber ? obj.telnumber : 'No Number',
        }
      })}
      actions={[
        {
          icon: AccountCircleIcon,
          tooltip: 'Go to Profile',
          onClick: (event, rowData) => history.push(`/profile/${rowData.id}`),
        },
      ]}
    />
  )
}

UsersTable.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})
export default connect(mapStateToProps, { getAllProfiles })(UsersTable)
