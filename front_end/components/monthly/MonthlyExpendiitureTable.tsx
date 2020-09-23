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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
});

interface Props {}

const MonthlyExpenditureTable: React.FC = (props: Props) => {
  const monthlyExpenditures = useSelector(state => state.monthlyExpenditures)

  const classes = useStyles();

  return (
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
                {row.title}
              </TableCell>
              <TableCell align="right">
                {row.amount}
              </TableCell>
              <TableCell align="right">
                <TextareaAutosize rowsMax={2} placeholder="Content" defaultValue={row.content} />
              </TableCell>
              <TableCell align="right">
                {row.isActive ? '有効' : '無効'}
              </TableCell>
              <TableCell align="right">
                {row.willCreateAt}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MonthlyExpenditureTable
