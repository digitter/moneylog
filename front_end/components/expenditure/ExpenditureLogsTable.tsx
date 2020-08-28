import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import ExpenditureLog from '../../models/ExpenditureLog';
import EdtingExpenditureLog from './EditingExpenditureLog';
import { deleteExpenditureLog } from '../../services/ExpenditureLogService';
import { editExpenditureLogs } from '../../modules/ExpenditureLogModule';
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

interface tableData {
  title: string;
  amount: number;
  content: string;
  edit?: string;
  delete?: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator(
  order: Order,
  orderBy: string,
): (a: any, b: any) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

const ExpenditureLogsTable: React.FC = () => {
  const { useState } = React
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof tableData>('amount')
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState<number>(1)
  const [checkedLogs, setCheckedLogs] = useState<ExpenditureLog[]>([])
  const [rows, setRows] = useState<ExpenditureLog[]>([])

  const classes = useStyles()

  const expenditureLogs = useSelector(state => state.expenditureLogs)
  const dispatch = useDispatch()

  React.useEffect(() => {
    setRowsPerPage(expenditureLogs.length)

    const logs = expenditureLogs.map((expenditureLog: ExpenditureLog) => {
      return new ExpenditureLog(
        expenditureLog.title,
        expenditureLog.amount,
        expenditureLog.content,
        expenditureLog.id
      )
    })

    setRows(logs)
  }, [expenditureLogs])

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof tableData) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCheckedLogs(rows)
      return;
    }
    setCheckedLogs([])
  }

  const removeCheck = (expenditureLog: ExpenditureLog) => {
    setCheckedLogs(checkedLogs.filter(log => {
      if (log.id !== expenditureLog.id) return log
    }))
  }

  const handleCheckClick = (event: React.MouseEvent<unknown>, expenditureLog: ExpenditureLog) => {
    const logIds = checkedLogs.map(log => { return log.id})

    const selectedIndex = logIds.indexOf(expenditureLog.id)
    let newSelected: number[] = []

    if (selectedIndex === -1) { // Adding: 存在しない場合
      newSelected = newSelected.concat(logIds, expenditureLog.id)

      setCheckedLogs(checkedLogs.concat(expenditureLog))
    } else if (selectedIndex === 0) { // Removing: 最初に存在する場合
      newSelected = newSelected.concat(logIds.slice(1))
      removeCheck(expenditureLog)
    } else if (selectedIndex === logIds.length - 1) { // Removing: 最後に存在するもの
      newSelected = newSelected.concat(logIds.slice(0, -1))
      removeCheck(expenditureLog)
    } else if (selectedIndex > 0) { // Adding: 1番目以降にあるなら
      newSelected = newSelected.concat( // 3つの配列を連結させる
        logIds.slice(0, selectedIndex), // 最初〜取得した番号前まで取得
        logIds.slice(selectedIndex + 1), // 取得した番号+1番から最後まで取得
      )

      removeCheck(expenditureLog)
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage)

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => setDense(event.target.checked)

  const isSelected = (row: ExpenditureLog) => {
    return checkedLogs.map(log => { return log.id })
                      .indexOf(row.id) !== -1
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const handleDeleteClick = (expenditureLog: ExpenditureLog) => {
    if (window.confirm('Are you sure ?')) {
      deleteExpenditureLog(expenditureLog)
        .then((expenditureLogs: ExpenditureLog[]) => {
          dispatch(editExpenditureLogs<ExpenditureLog[]>('INITIALIZE', expenditureLogs))
          removeCheck(expenditureLog)
        })
        .catch(response => {
          console.error(response)
        })
    }
  }

  return (
    <React.Fragment>
        {expenditureLogs ? (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <EnhancedTableToolbar expenditureLogs={checkedLogs} numSelected={checkedLogs.length} setCheckedLogs={setCheckedLogs} />
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={checkedLogs.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row: any, index: number) => {

                        const isItemSelected = isSelected(row);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                                onClick={(event) => handleCheckClick(event, row)}
                              />
                            </TableCell>
                            <TableCell component="th" id={labelId} scope="row" padding="none">
                              {row.title}
                            </TableCell>
                            <TableCell align="center">{row.amount}</TableCell>
                            <TableCell align="left">{row.content}</TableCell>
                            <TableCell align="center"><EdtingExpenditureLog expenditureLog={row} /></TableCell>
                            <TableCell align="center">
                              <Tooltip title="Delete">
                                <IconButton aria-label="delete" onClick={() => handleDeleteClick(row)}>
                                  <DeleteForeverIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[1, 7, expenditureLogs.length]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
            <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </div>)
        : null}
    </React.Fragment>
  );
}
export default ExpenditureLogsTable
