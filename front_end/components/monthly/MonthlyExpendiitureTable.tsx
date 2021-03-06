import * as React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MonthlyExpenditure from '../../models/MonthlyExpenditure';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import { updateMonthlyExpenditure } from '../../services/MonthlyExpenditureService';
import CustomizedSelects from './CustomizedSelects';
import DatePickers from './DatePickers';
import { successMessage, errorMessage, succesmMessages, errorMessages } from '../GlobalMessage';

const useStyles = makeStyles({
  root: {
    width: '90%',
    margin: '30px auto'
  },
  table: {
    minWidth: 650,
  },
  contentsTitle: {
    display: 'inline-block',
    textAlign: 'center',
    borderRadius: 2,
    padding: 5,
    margin: '20px auto',
    fontWeight:  10,
    letterSpacing: 2,
    background: '#263238',
    color: 'white',
    borderLeft: '5px solid #818ed3',
    borderRight: '5px solid #818ed3',
  },
});

interface Props {}

const MonthlyExpenditureTable: React.FC<Props> = props => {
  const monthlyExpenditures = useSelector(state => state.monthlyExpenditures)

  const classes = useStyles();

  const handleMonthlyDataBlur = (row: MonthlyExpenditure) => event => {
    switch (event.currentTarget.name) {
      case 'title':
        if (event.currentTarget.value === row.title) { return null }
      case 'amount':
        if (event.currentTarget.value === row.amount) { return null }
      case 'content':
        if (event.currentTarget.value === row.content) { return null }
    }

    const newMonthlyData = Object.assign(row, { [event.currentTarget.name]: event.currentTarget.value })

    updateMonthlyExpenditure(newMonthlyData)
      .then(jsonApiFormat => {
        successMessage(succesmMessages.update)
      })
      .catch(response => {
        console.error(response)
        errorMessage(errorMessages.update)
      })
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <h3 className={classes.contentsTitle}>Monthly Expenditures</h3>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Content</TableCell>
                <TableCell align="right">ログ自動作成</TableCell>
                <TableCell align="right">ログ作成予定日</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {monthlyExpenditures.map((row: MonthlyExpenditure, index: number) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <TextField
                      name="title"
                      label="title"
                      variant="outlined"
                      defaultValue={row.title}
                      onBlur={handleMonthlyDataBlur(row)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      name="amount"
                      type="number"
                      id="outlined-basic"
                      label="amount"
                      variant="outlined"
                      defaultValue={row.amount}
                      onBlur={handleMonthlyDataBlur(row)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextareaAutosize
                      name="content"
                      rowsMax={2}
                      placeholder="Content"
                      defaultValue={row.content}
                      onBlur={handleMonthlyDataBlur(row)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <CustomizedSelects row={row} />
                  </TableCell>
                  <TableCell align="right">
                    <DatePickers row={row} />
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
        </TableContainer>
      </div>
    </React.Fragment>
  );
}

export default MonthlyExpenditureTable
