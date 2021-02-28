import * as React from 'react';
import * as moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'

import ExpenditureLog from '../../../models/ExpenditureLog';
import EdtingExpenditureLog from './EditingExpenditureLog';
import { deleteExpenditureLog } from '../../../services/ExpenditureLogService';
import { editExpenditureLog } from '../../../modules/ExpenditureLogModule';
import ExpenditureTableHead from './ExpeditureTableHead'
import ExpenditureTableToolbar from './ExpenditureTableToolbar'

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
import DeleteAlert from '../common/DeleteAlert';
import TagAttachedToExpenditure from './TagAttachedToExpenditure';
import { TextField, Grid } from '@material-ui/core';
import PaidAtPicker from './common/PaidAtpicker';
import ExpenditurePieChart from './common/ExpenditurePieChart';
import { setLoadingMessage } from '../../../modules/CommonModule';
import Notification, { progress, error, success } from '../../../models/Notification';

interface tableData {
  title: string;
  amount: number;
  paidAt: Date;
  edit: string;
  delete: string;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
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
      minWidth: 360,
      marginBottom: theme.spacing(2),
    },
    tableContainer: {
      maxHeight: 350,
      minWidth: 360,
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 360,
    },
    tableBodyCell: {
      padding: '6px 0 3px 0',
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      }
    },
    tableBodyCellSm: {
      width: 150,
      whiteSpace: 'nowrap',
      overflow: 'scroll',
      [theme.breakpoints.down('sm')]: {
        width: 100,
        whiteSpace: 'nowrap',
        overflow: 'scroll',
      },
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

const ExpenditureLogsTable: React.FC = () => {
  const classes = useStyles()

  const expenditureLogs = useSelector(state => state.expenditureLogs)
  const dispatch = useDispatch()

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<keyof tableData>('paidAt')
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(true)
  const [rowsPerPage, setRowsPerPage] = useState<number>(1)
  const [checkedLogs, setCheckedLogs] = useState<ExpenditureLog[]>([])
  const [rows, setRows] = useState<ExpenditureLog[]>([])
  const [currentYYMM, setCurrentYYMM] = useState<string>(moment(new Date()).format('YYYY-MM'))

  const [totalAmount, setTotalAmount] = useState<number>(null)

  React.useEffect(() => {
    const currentMonthLogs: ExpenditureLog[] = ExpenditureLog.selectLogsByMonth(expenditureLogs, currentYYMM)

    setRowsPerPage(currentMonthLogs.length)
    setRows(currentMonthLogs)
    setTotalAmount(ExpenditureLog.calculateTotalAmount(currentMonthLogs))

    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [expenditureLogs])

  const chartWidth = () => {
    const width = windowDimensions.width
    if (width < 380) { return 350 }
    else if (width < 670) { return 250 }
    else { return null }
  }

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
    dispatch(setLoadingMessage(progress.destroy))

    deleteExpenditureLog(expenditureLog)
      .then((expenditureLog: ExpenditureLog) => {
        dispatch(editExpenditureLog('DESTROY_EXPENDITURE_LOG', expenditureLog))
        removeCheck(expenditureLog)

        Notification.successMessage(success.destroy)
        dispatch(setLoadingMessage(null))
      })
      .catch(response => {
        console.error(response)
        Notification.errorMessage(error.destroy)
        dispatch(setLoadingMessage(null))
      })
  }

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const yyyymm: string = event.currentTarget.value
    const selectedLogs: ExpenditureLog[] = ExpenditureLog.selectLogsByMonth(expenditureLogs, yyyymm)

    setRowsPerPage(selectedLogs.length)
    setRows(selectedLogs)
    setTotalAmount(ExpenditureLog.calculateTotalAmount(selectedLogs))
    setCurrentYYMM(yyyymm)
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <strong className={classes.contentsTitle}>expenditure logs</strong>

        <TextField
          type="month"
          InputProps={{inputProps: { min: "2000-01", max: `${moment().year()}-12` } }}
          defaultValue={currentYYMM}
          onChange={handleMonthChange}
        />

        <strong style={{paddingLeft: 20}}>{totalAmount} ¥</strong>

        <Grid container wrap='wrap'>
          <Grid item xs={12} sm={8} md={9}>
            <Paper className={classes.paper}>

              <ExpenditureTableToolbar
                expenditureLogs={checkedLogs}
                numSelected={checkedLogs.length}
                setCheckedLogs={setCheckedLogs}
              />

              <TableContainer className={classes.tableContainer}>
                <Table
                  stickyHeader
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  size={dense ? 'small' : 'medium'}
                  aria-label="enhanced table"
                >

                  <caption>Expenditure Logs</caption>

                  <ExpenditureTableHead
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
                            <TableCell
                              className={classes.tableBodyCell}
                              align='center'
                            >
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                                onClick={(event) => handleCheckClick(event, row)}
                              />
                            </TableCell>
                            <TableCell align='center' className={classes.tableBodyCell}>
                              <div className={classes.tableBodyCellSm}>
                                {row.title}
                              </div>
                            </TableCell>
                            <TableCell align='center' className={`${classes.tableBodyCell}`}>
                              <div className={classes.tableBodyCellSm}>
                                {row.amount}
                              </div>
                            </TableCell>
                            <TableCell align='center' className={classes.tableBodyCell}>
                              <PaidAtPicker expenditureLog={row} />
                            </TableCell>
                            <TableCell align='center' className={classes.tableBodyCell}>
                              <TagAttachedToExpenditure row={row} />
                            </TableCell>
                            <TableCell align='center' className={classes.tableBodyCell}>
                              <EdtingExpenditureLog expenditureLog={row} />
                            </TableCell>
                            <TableCell align='center' className={classes.tableBodyCell}>
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
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <ExpenditurePieChart
              graphID='monthlyExpenditure'
              width={chartWidth()}
              height={300}
              logs={rows}
              title={`${currentYYMM}: classification`}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
export default ExpenditureLogsTable
