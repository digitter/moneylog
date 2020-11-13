import * as React from 'react';
import * as moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'

import IncomeLog from '../../../models/IncomeLog';
import EdtingIncomeLog from './EditingIncomeLog';
import { deleteIncomeLog } from '../../../services/IncomeLogService';
import { editIncomeLog } from '../../../modules/IncomeLogModule';
import IncomeTableHead from './IncomeTableHead'
import IncomeTableToolbar from './IncomeTableToolbar'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CreateIncomeLogModal from './CreateIncomeLogModal';
import DeleteAlert from '../common/DeleteAlert';
import { successMessage, succesmMessages } from '../../GlobalMessage';
import TagAttachedToIncome from './TagAttachedToIncome';
import { TextField, Grid } from '@material-ui/core';
import EarnedAtPickers from './common/EarnedAtPicker';
import PieChart from '../chart/Piechart';

interface tableData {
  title: string;
  amount: number;
  earnedAt: Date;
  edit: string;
  delete: string;
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

const { useState } = React

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '96%',
      margin: '30px auto',
    },
    paper: {
      minWidth: 1000,
      marginBottom: theme.spacing(2),
    },
    tableContainer: {
      maxHeight: 350,
      minWidth: 1000,
    },
    table: {
      minWidth: 1000,
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
    contentsTitle: {
      width: 300,
      background: '#263238',
      color: 'white',
      textAlign: 'center',
      letterSpacing: 2,
      borderRadius: 2,
      padding: 5,
      margin: 10,
      fontWeight:  10,
      borderLeft: '5px solid #818ed3',
      borderRight: '5px solid #818ed3',
    },
  }),
);

const IncomeLogsTable: React.FC = () => {
  const classes = useStyles()

  const incomeLogs = useSelector(state => state.incomeLogs)
  const dispatch = useDispatch()

  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<keyof tableData>('earnedAt')
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(true)
  const [rowsPerPage, setRowsPerPage] = useState<number>(1)
  const [checkedLogs, setCheckedLogs] = useState<IncomeLog[]>([])
  const [rows, setRows] = useState<IncomeLog[]>([])
  const [currentYYMM, setCurrentYYMM] = useState<string>(moment(new Date()).format('YYYY-MM'))

  const [totalAmount, setTotalAmount] = useState<number>(null)

  React.useEffect(() => {
    const currentMonthLogs: IncomeLog[] = IncomeLog.selectLogsByMonth(incomeLogs, currentYYMM)

    setRowsPerPage(currentMonthLogs.length)
    setRows(currentMonthLogs)
    setTotalAmount(IncomeLog.calculateTotalAmount(currentMonthLogs))
  }, [incomeLogs])

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

  const removeCheck = (incomeLog: IncomeLog) => {
    setCheckedLogs(checkedLogs.filter(log => {
      if (log.id !== incomeLog.id) return log
    }))
  }

  const handleCheckClick = (event: React.MouseEvent<unknown>, incomeLog: IncomeLog) => {
    const logIds = checkedLogs.map(log => { return log.id})

    const selectedIndex = logIds.indexOf(incomeLog.id)
    let newSelected: number[] = []

    if (selectedIndex === -1) { // Adding: 存在しない場合
      newSelected = newSelected.concat(logIds, incomeLog.id)
      setCheckedLogs(checkedLogs.concat(incomeLog))
    } else if (selectedIndex === 0) { // Removing: 最初に存在する場合
      newSelected = newSelected.concat(logIds.slice(1))
      removeCheck(incomeLog)
    } else if (selectedIndex === logIds.length - 1) { // Removing: 最後に存在するもの
      newSelected = newSelected.concat(logIds.slice(0, -1))
      removeCheck(incomeLog)
    } else if (selectedIndex > 0) { // Adding: 1番目以降にあるなら
      newSelected = newSelected.concat( // 3つの配列を連結させる
        logIds.slice(0, selectedIndex), // 最初〜取得した番号前まで取得
        logIds.slice(selectedIndex + 1), // 取得した番号+1番から最後まで取得
      )

      removeCheck(incomeLog)
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage)

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => setDense(event.target.checked)

  const isSelected = (row: IncomeLog) => {
    return checkedLogs.map(log => { return log.id })
                      .indexOf(row.id) !== -1
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const handleDeleteClick = (incomeLog: IncomeLog) => {
    deleteIncomeLog(incomeLog)
      .then((incomeLog: IncomeLog) => {
        dispatch(editIncomeLog('DESTROY_INCOME_LOG', incomeLog))
        removeCheck(incomeLog)
        successMessage(succesmMessages.destroy)
      })
      .catch(response => {
        console.error(response)
      })
  }

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const yymm: string = event.currentTarget.value
    const selectedLogs: IncomeLog[] = IncomeLog.selectLogsByMonth(incomeLogs, yymm)

    setRowsPerPage(selectedLogs.length)
    setRows(selectedLogs)
    setTotalAmount(IncomeLog.calculateTotalAmount(selectedLogs))
    setCurrentYYMM(yymm)
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <h3 className={classes.contentsTitle}>income logs</h3>
        <Grid container justify='flex-start'>
          <Grid item>
            <strong>{totalAmount} ¥</strong>
            <br />

            <TextField
              type="month"
              InputProps={{inputProps: { min: "2000-01", max: `${moment().year()}-12` } }}
              defaultValue={currentYYMM}
              onChange={handleMonthChange}
            />
          </Grid>
          <Grid item>
            <CreateIncomeLogModal />
            <CreateIncomeLogModal />
            <CreateIncomeLogModal />
          </Grid>
        </Grid>

        <Grid container wrap='wrap'>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              <IncomeTableToolbar incomeLogs={checkedLogs} numSelected={checkedLogs.length} setCheckedLogs={setCheckedLogs} />
              <TableContainer className={classes.tableContainer}>
                <Table
                  stickyHeader
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                  aria-label="enhanced table"
                >
                  <caption>Income Logs</caption>
                  <IncomeTableHead
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
                            <TableCell padding="checkbox" size='small'>
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                                onClick={(event) => handleCheckClick(event, row)}
                              />
                            </TableCell>
                            <TableCell align='left' size='small'>
                              {row.title}
                            </TableCell>
                            <TableCell align='left' size='small'>
                              {row.amount}
                            </TableCell>
                            <TableCell align='left' size='small'>
                              <EarnedAtPickers incomeLog={row} />
                            </TableCell>
                            <TableCell align='left' size='small'>
                              <TagAttachedToIncome row={row} />
                            </TableCell>
                            <TableCell align='left' size='small'>
                              <EdtingIncomeLog incomeLog={row} />
                            </TableCell>
                            <TableCell align='left' size='small'>
                              <DeleteAlert handleDeleteClick={handleDeleteClick} row={row} />
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
                rowsPerPageOptions={[1, 7, incomeLogs.length]}
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
          </Grid>

          <Grid item>
            <PieChart
              width={300}
              height={300}
              logs={rows}
              title={`${currentYYMM}: income classification`}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
export default IncomeLogsTable
