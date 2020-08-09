import 'date-fns'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import CanvasJSReact from '../../charts/canvasjs.react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import Spinner from '../layout/Spinner'
import { Redirect } from 'react-router-dom'
var CanvasJSChart = CanvasJSReact.CanvasJSChart
var CanvasJS = CanvasJSReact.CanvasJS

const Reports = ({ user }) => {
  const [date, setDate] = React.useState({
    to: '2020-05-31',
    from: '2020-01-01',
  })
  const [data, setData] = React.useState({
    loading: false,
    dataPoints: [
      { y: 0, label: 'Posts' },
      { y: 0, label: 'Discussions' },
      { y: 0, label: 'Projects' },
      { y: 0, label: 'Notices' },
    ],
  })
  if (user && user.category !== 'admin') {
    return <Redirect to='/dashboard' />
  }
  const options = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: 'Usage of IM Portal',
    },
    axisX: {
      title: 'Activities',
      reversed: true,
    },
    axisY: {
      title: 'Published Units',
    },
    data: [
      {
        type: 'bar',
        dataPoints: data.dataPoints,
      },
    ],
  }
  const onSubmit = async (e) => {
    setData({ ...data, loading: true })
    e.preventDefault()
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await axios.post(
        '/api/admin/report/monthly-usage',
        date,
        config
      )
      console.log(res.data)
      setData({ ...data, dataPoints: res.data })
    } catch (err) {
      console.log(err)
    }
  }
  return user ? (
    <div>
      <h1>Overview</h1>
      <form className='form my-1' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          {' '}
          <strong>From: </strong>
          <TextField
            id='date'
            type='date'
            name='from'
            value={date.from}
            onChange={(e) => {
              setDate({ ...date, [e.target.name]: e.target.value })
              console.log(date)
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className='form-group'>
          <strong style={{ marginRight: 20 }}>To: </strong>
          <TextField
            id='date'
            type='date'
            name='to'
            value={date.to}
            onChange={(e) => {
              setDate({ ...date, [e.target.name]: e.target.value })
              console.log(date)
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <input type='submit' className='btn btn-dark my-1' value='View' />
      </form>
      {data.loading ? <Spinner /> : <CanvasJSChart options={options} />}
    </div>
  ) : (
    <Spinner />
  )
}

Reports.propTypes = {
  user: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
  systemUsers: state.admin.users,
})
export default connect(mapStateToProps)(Reports)
