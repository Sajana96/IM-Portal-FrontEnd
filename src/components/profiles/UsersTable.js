import React from 'react'
import MaterialTable from 'material-table'

const UsersTable = () => {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  })

  return (
    <MaterialTable
      title='Editable Example'
      columns={state.columns}
      data={state.data}
    />
  )
}
export default UsersTable
