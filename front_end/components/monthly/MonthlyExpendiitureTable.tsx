import * as React from 'react';
import { useSelector } from 'react-redux'
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
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import TextField from '@material-ui/core/TextField';

const { useState } = React

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
});

interface Props {}

const MonthlyExpenditureTable: React.FC = (props: Props) => {
  const monthlyExpenditures = useSelector(state => state.monthlyExpenditures)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(null)
  const [content, setContent] = useState('')
  const [isActive, setIsActive] = useState(null)
  const [willCreateAt, setWillCreateAt] = useState(null)

  const classes = useStyles();

  const handleMonthlyDataChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(event.currentTarget.value)

    switch (event.currentTarget.name) {
      case 'title':
        setTitle(event.currentTarget.value)
        console.log(title)
        break;
      case 'amount':
        setAmount(Number(event.currentTarget.value))
        console.log(amount)
        break;
      case 'content':
        setContent(event.currentTarget.value)
        break;
    }
  }

  const reflectMonthlyData = (event) => {
    console.log(event.target.name)
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Content</TableCell>
              <TableCell align="right">ログ自動作成</TableCell>
              <TableCell align="right">ログ作成予定日</TableCell>
              {/* <TableCell align="right">Edit</TableCell> */}
              {/* <TableCell align="right">Delete</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {monthlyExpenditures.map((row: MonthlyExpenditure, index: number) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <TextField name="title" id="outlined-basic" label="title" variant="outlined" defaultValue={row.title} onChange={handleMonthlyDataChange} />
                </TableCell>
                <TableCell align="right">
                  <TextField name="amount" type="number" id="outlined-basic" label="amount" variant="outlined" defaultValue={row.amount} onChange={handleMonthlyDataChange} />
                </TableCell>
                <TableCell align="right">
                  <TextareaAutosize name="content" rowsMax={2} placeholder="Content" defaultValue={row.content} onChange={handleMonthlyDataChange} />
                </TableCell>
                <TableCell align="right">
                  {row.isActive ? '有効' : '無効'}
                </TableCell>
                <TableCell align="right">
                  {row.willCreateAt}
                </TableCell>
                {/* <TableCell align="right">
                  <Tooltip title="Update">
                    <IconButton aria-label="update">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell> */}
                {/* <TableCell align="right">
                  <IconButton aria-label="delete">
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default MonthlyExpenditureTable
