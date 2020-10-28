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
import CreateExpenditureLogModal from './CreateExpenditureLogModal';
import DeleteAlert from '../common/DeleteAlert';
import { successMessage, succesmMessages } from '../../GlobalMessage';
import TagAttachedToExpenditure from './TagAttachedToExpenditure';

interface tableData {
  title: string;
  amount: number;
  content: string;
  paidAt: Date;
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxHeight: 671
    },
    root: {
      width: '90%',
      margin: '30px auto',
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
    contentsTitle: {
      background: '#263238',
      color: 'white',
      textAlign: 'center',
      letterSpacing: 2,
      borderRadius: 2,
      display: 'inline-block',
      padding: 5,
      margin: '20px 20px',
      fontWeight:  10,
      borderLeft: '5px solid #818ed3',
      borderRight: '5px solid #818ed3',
    },
  }),
);

const ExpenditureLogsTable: React.FC = () => {
  const { useState } = React
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof tableData>('amount')
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(true)
  const [rowsPerPage, setRowsPerPage] = useState<number>(1)
  const [checkedLogs, setCheckedLogs] = useState<ExpenditureLog[]>([])
  const [rows, setRows] = useState<ExpenditureLog[]>([])

  const classes = useStyles()

  const expenditureLogs = useSelector(state => state.expenditureLogs)
  const dispatch = useDispatch()

  React.useEffect(() => {
    setRowsPerPage(expenditureLogs.length)

    const logs = expenditureLogs.map((log: ExpenditureLog) => {
      return new ExpenditureLog(
        log.title,
        log.amount,
        log.content,
        log.paidAt,
        log.tagIds,
        log.id
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
    deleteExpenditureLog(expenditureLog)
      .then((expenditureLog: ExpenditureLog) => {
        dispatch(editExpenditureLog('DESTROY_EXPENDITURE_LOG', expenditureLog))
        removeCheck(expenditureLog)
        successMessage(succesmMessages.destroy)
      })
      .catch(response => {
        console.error(response)
      })
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <h3 className={classes.contentsTitle}>expenditure logs</h3>

        <CreateExpenditureLogModal />

        <div>
          <h4 style={{marginLeft: 20, color: '#535353'}}>58400¥</h4>
        </div>

        <Paper className={classes.paper}>
          <ExpenditureTableToolbar expenditureLogs={checkedLogs} numSelected={checkedLogs.length} setCheckedLogs={setCheckedLogs} />
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <ExpenditureTableHead
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
                        <TableCell align='left'>
                          {row.title}
                        </TableCell>
                        <TableCell align='left'>
                          {row.amount}
                        </TableCell>
                        <TableCell align='left'>
                          {row.content}
                        </TableCell>
                        <TableCell align='left'>
                          {moment(row.paidAt).format('YYYY-MM-DD')}
                        </TableCell>
                        <TableCell align='left'>
                          <TagAttachedToExpenditure row={row} />
                        </TableCell>
                        <TableCell align='left'>
                          <EdtingExpenditureLog expenditureLog={row} />
                        </TableCell>
                        <TableCell align='left'>
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
      </div>
    </React.Fragment>
  );
}
export default ExpenditureLogsTable
