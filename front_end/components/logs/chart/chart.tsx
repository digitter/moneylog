import * as React from 'react'
import { Chart } from "react-google-charts";

import { useTypedSelector } from '../../../modules/Reducers'
import Tag, { pendingChartData } from '../../../models/Tag'
import ExpenditureLog from '../../../models/ExpenditureLog';
import IncomeLog from '../../../models/IncomeLog';

const calculateTotalAmount = (chartData: pendingChartData[]): number => {
  const totalAmount = chartData.map(d => d.totalAmount)
  return totalAmount.reduce(additionReducer, 0)
}

const additionReducer = (accumulator: number, currentValue: number): number => accumulator + currentValue

const { useState } = React

interface Props {
  logs?: ExpenditureLog[] | IncomeLog[]
  width?: string | number
  height?: string | number
  title?: string
  pieSliceText?: 'none'
  tooltip?: 'none'
}

const PieChart: React.FC<Props> = (props) => {
  const tags = useTypedSelector(state => state.tags)
  const expenditureLogs = useTypedSelector(state => state.expenditureLogs)

  const [data, setData] = useState<Array<[string, number]>>([])
  const [tagColor, setTagColor] = useState<Array<{color: string}>>([])
  const [totalAmount, setTotalAmount] = useState<number>(0)

  React.useEffect(() => {
    Tag.createChartData(tags, props.logs || expenditureLogs)
      .then(pendingChartData => {
        setTotalAmount(calculateTotalAmount(pendingChartData))
        setTagColor(Tag.extractTagColorObj(pendingChartData))
        setData(Tag.confirmChartData(pendingChartData))
      })
  }, [tags, expenditureLogs ,props.logs])

  return (
    <React.Fragment>
      {/* <div style={{backgroundColor: '#f7f7f7'}}> */}
        <strong style={{margin: 10, color: '#535353'}}>total: {totalAmount}¥</strong>

        <Chart
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
            title: `\n total: ${totalAmount}`,
            tooltip: { trigger: props.tooltip || null },
            pieHole: 0.4,
            pieStartAngle: 100,
            slices: {
              ...tagColor
            },
            backgroundColor: '#edf3ff'
            // backgroundColor: '#f7f7f7'
          }}
          rootProps={{ 'data-testid': '4' }}
        />
      {/* </div> */}
    </React.Fragment>
  )
}

export default PieChart
