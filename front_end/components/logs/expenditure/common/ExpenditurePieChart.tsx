import * as React from 'react'
import { Chart } from "react-google-charts";
import { useTypedSelector } from '../../../../modules/Reducers';
import Tag from '../../../../models/Tag';
import ExpenditureLog from '../../../../models/ExpenditureLog';
import { Grid, makeStyles, createStyles } from '@material-ui/core';

const { useState } = React

const useStyles = makeStyles((theme) => createStyles({
  chartTitle: {
    padding: 10,
    background: '#e2e2e2',
    borderRadius: 5,
    textAlign: 'center'
  },
  chartAmount: {
    margin: 10,
    color: '#535353',
    borderBottom: '1px solid black'
  },
  chartSize: {
    [theme.breakpoints.down('sm')]: {
      width: 200,
      height: 200,
    }
  },
  contentsTitle: {
    background: '#263238',
    color: 'white',
    textAlign: 'center',
    borderRadius: 2,
    padding: 5,
    margin: 10,
    fontWeight:  10,
    borderLeft: '5px solid #818ed3',
    borderRight: '5px solid #818ed3',
  },
}))

interface Props {
  graphID: string
  logs: ExpenditureLog[]
  width?: string | number
  height?: string | number
  title?: string
  pieSliceText?: 'none'
  tooltip?: 'none'
}

const ExpenditurePieChart: React.FC<Props> = (props) => {
  const classes = useStyles()

  const tags = useTypedSelector(state => state.tags)
  const expenditureLogs = useTypedSelector(state => state.expenditureLogs)

  const [data, setData] = useState<Array<[string, number]>>([])
  const [tagColor, setTagColor] = useState<Array<{color: string}>>([])
  const [totalAmount, setTotalAmount] = useState<number>(0)

  React.useEffect(() => {
    Tag.createChartData(tags, props.logs)
      .then(pendingChartData => {
        setTotalAmount(Tag.calculateTotalAmount(pendingChartData))
        setTagColor(Tag.extractTagColorObj(pendingChartData))
        setData(Tag.confirmChartData(pendingChartData))
      })
  }, [tags, expenditureLogs, props.logs])

  return (
    <React.Fragment>
      <Grid container direction='column'>
        <Grid item>
          {props.title ?
            <strong className={classes.contentsTitle}>
              {props.title}
            </strong>
          : null}
        </Grid>

        {expenditureLogs && props.logs.length ?
          <Grid item>
            <Chart
              graph_id={props.graphID}
              width={props.width || 360}
              height={props.height || 360}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Total amount', 'classified by tag'],
                ...data
              ]}
              options={{
                legend: 'none',
                pieSliceText: props.pieSliceText || 'label',
                title: props.title ? `${props.title}` : '',
                tooltip: { trigger: props.tooltip || 'OK' },
                pieHole: 0.4,
                pieStartAngle: 100,
                slices: {
                  ...tagColor
                },
                backgroundColor: '#edf3ff'
              }}
              rootProps={{ 'data-testid': '4' }}
            />
          </Grid>
        : null}

        <Grid item>
          total:<strong className={classes.chartAmount}>{expenditureLogs.length ? totalAmount : 0}¥</strong>
          <br />
          <p>lorem ipsum lorem ipsum</p>
          <strong>lorem ipsum lorem ipsum</strong>
          <div>lorem ipsum lorem ipsum lorem ipsum</div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ExpenditurePieChart
