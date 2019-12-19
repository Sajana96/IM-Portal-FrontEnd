import React from 'react'

const AlertShow = props => {
  if (props.alert.show) {
    return (
      <div className={`alert alert-${props.alert.type}`}>
        {props.alert.message}
      </div>
    )
  } else return <div></div>
}

export default AlertShow
