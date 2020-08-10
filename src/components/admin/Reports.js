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
      { y: 0, label: 'Answers' },
    ],
  })
  const [annualData, setAnnualData] = React.useState({
    loading: false,
    discussions: [],
    notices: [],
    projects: [],
    posts: [],
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
  const optionsSecond = {
    animationEnabled: true,
    theme: 'light2',
    title: {
      text: 'Annual Usage of IM Portal',
    },
    axisX: {
      valueFormatString: 'MMM',
      title: 'Month',
    },
    axisY: {
      title: 'Units Published',
    },
    data: [
      {
        yValueFormatString: '#,###',
        xValueFormatString: 'MMMM',
        type: 'spline',
        showInLegend: true,
        legendText: 'Discussions',
        dataPoints: annualData.discussions,
      },
      {
        yValueFormatString: '#,###',
        xValueFormatString: 'MMMM',
        type: 'spline',
        showInLegend: true,
        legendText: 'Projects',
        dataPoints: annualData.projects,
      },
      {
        yValueFormatString: '#,###',
        xValueFormatString: 'MMMM',
        type: 'spline',
        showInLegend: true,
        legendText: 'Notices',
        dataPoints: annualData.notices,
      },
      {
        yValueFormatString: '#,###',
        xValueFormatString: 'MMMM',
        type: 'spline',
        showInLegend: true,
        legendText: 'Blog Posts',
        dataPoints: annualData.posts,
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
  const getannualReport = async () => {
    setAnnualData({ ...annualData, loading: true })
    try {
      const res = await axios.get('/api/admin/report/annual')
      console.log(res.data)
      setAnnualData({
        ...annualData,
        loading: false,
        discussions: [
          { x: new Date(2017, 0), y: res.data.discussionData.Jan },
          { x: new Date(2017, 1), y: res.data.discussionData.Feb },
          { x: new Date(2017, 2), y: res.data.discussionData.March },
          { x: new Date(2017, 3), y: res.data.discussionData.April },
          { x: new Date(2017, 4), y: res.data.discussionData.May },
          { x: new Date(2017, 5), y: res.data.discussionData.June },
          { x: new Date(2017, 6), y: res.data.discussionData.July },
          { x: new Date(2017, 7), y: res.data.discussionData.Aug },
          { x: new Date(2017, 8), y: res.data.discussionData.Sep },
          { x: new Date(2017, 9), y: res.data.discussionData.Oct },
          { x: new Date(2017, 10), y: res.data.discussionData.Nov },
          { x: new Date(2017, 11), y: res.data.discussionData.Dec },
        ],
        notices: [
          { x: new Date(2017, 0), y: res.data.noticeData.Jan },
          { x: new Date(2017, 1), y: res.data.noticeData.Feb },
          { x: new Date(2017, 2), y: res.data.noticeData.March },
          { x: new Date(2017, 3), y: res.data.noticeData.April },
          { x: new Date(2017, 4), y: res.data.noticeData.May },
          { x: new Date(2017, 5), y: res.data.noticeData.June },
          { x: new Date(2017, 6), y: res.data.noticeData.July },
          { x: new Date(2017, 7), y: res.data.noticeData.Aug },
          { x: new Date(2017, 8), y: res.data.noticeData.Sep },
          { x: new Date(2017, 9), y: res.data.noticeData.Oct },
          { x: new Date(2017, 10), y: res.data.noticeData.Nov },
          { x: new Date(2017, 11), y: res.data.noticeData.Dec },
        ],
        projects: [
          { x: new Date(2017, 0), y: res.data.projectData.Jan },
          { x: new Date(2017, 1), y: res.data.projectData.Feb },
          { x: new Date(2017, 2), y: res.data.projectData.March },
          { x: new Date(2017, 3), y: res.data.projectData.April },
          { x: new Date(2017, 4), y: res.data.projectData.May },
          { x: new Date(2017, 5), y: res.data.projectData.June },
          { x: new Date(2017, 6), y: res.data.projectData.July },
          { x: new Date(2017, 7), y: res.data.projectData.Aug },
          { x: new Date(2017, 8), y: res.data.projectData.Sep },
          { x: new Date(2017, 9), y: res.data.projectData.Oct },
          { x: new Date(2017, 10), y: res.data.projectData.Nov },
          { x: new Date(2017, 11), y: res.data.projectData.Dec },
        ],
        posts: [
          { x: new Date(2017, 0), y: res.data.postData.Jan },
          { x: new Date(2017, 1), y: res.data.postData.Feb },
          { x: new Date(2017, 2), y: res.data.postData.March },
          { x: new Date(2017, 3), y: res.data.postData.April },
          { x: new Date(2017, 4), y: res.data.postData.May },
          { x: new Date(2017, 5), y: res.data.postData.June },
          { x: new Date(2017, 6), y: res.data.postData.July },
          { x: new Date(2017, 7), y: res.data.postData.Aug },
          { x: new Date(2017, 8), y: res.data.postData.Sep },
          { x: new Date(2017, 9), y: res.data.postData.Oct },
          { x: new Date(2017, 10), y: res.data.postData.Nov },
          { x: new Date(2017, 11), y: res.data.postData.Dec },
        ],
      })
    } catch (err) {
      console.log(err)
    }
  }
  return user ? (
    <div>
      <h1 className='large text-primary'>IM Portal Usage Insights</h1>
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
      <div style={{ padding: 60 }}></div>
      <button className='btn btn-dark' onClick={(e) => getannualReport()}>
        <i className='far fa-chart-bar'></i>Get Annual Overview of{' '}
        {new Date().getFullYear()}
      </button>
      {annualData.loading ? (
        <Spinner />
      ) : (
        <CanvasJSChart options={optionsSecond} />
      )}
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
