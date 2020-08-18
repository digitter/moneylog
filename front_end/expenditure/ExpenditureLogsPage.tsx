import * as React from 'react'
import EdtingExpenditureLog from './EditingExpenditureLog'
import CreateExpenditureLog from './CreateExpenditureLog'
import { expenditureLogParams } from '../models/ExpenditureLog'
import { deleteExpenditureLog } from '../services/ExpenditureLogService'

interface Props {
  expenditureLogs: any
}

const ExpenditureLogsPage = (props: Props) => {
  const handleDelete = (expenditureLog: expenditureLogParams) => {
    const result = window.confirm('Are you sure ?')

    if (result) {
      deleteExpenditureLog(expenditureLog)
        .then(response => {
          console.log(response)
        })
        .catch(response => {
          console.error(response)
        })
    }
  }

  return (
    <React.Fragment>
      <h2>ExpenditureLogs</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Cost</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(props.expenditureLogs).length !== 0 ?
              props.expenditureLogs.map((expendtureLog: expenditureLogParams, index: number) =>{
                return (
                  <tr key={index}>
                    <td key={expendtureLog.title}>
                        {expendtureLog.title}
                    </td>
                    <td key={expendtureLog.amount}>
                      {expendtureLog.amount}
                    </td>
                    <td key={expendtureLog.content}>
                      {expendtureLog.content}
                    </td>
                    <td key={expendtureLog.id}>
                      <EdtingExpenditureLog expenditureLog={expendtureLog} />
                    </td>
                    <td>
                      <button onClick={() => handleDelete(expendtureLog)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            : null}
        </tbody>
      </table>

      <CreateExpenditureLog />
    </React.Fragment>
  )
}

export default ExpenditureLogsPage
