import * as React from 'react'
import { Chart } from "react-google-charts";

import { useTypedSelector } from '../../../modules/Reducers'
import Tag, { pendingChartData } from '../../../models/Tag'

const calculateTotalAmount = (chartData: pendingChartData[]): number => {
  const totalAmount = chartData.map(d => d.totalAmount)
  return totalAmount.reduce(additionReducer, 0)
}

const additionReducer = (accumulator: number, currentValue: number): number => accumulator + currentValue

const { useState } = React

const PieChart: React.FC = (logs) => {
  const tags = useTypedSelector(state => state.tags)
  const expenditureLogs = useTypedSelector(state => state.expenditureLogs)

  const [data, setData] = useState<Array<[string, number]>>([])
  const [tagColor, setTagColor] = useState<Array<{color: string}>>([])
  const [totalAmount, setTotalAmount] = useState<number>(0)

  React.useEffect(() => {
    Tag.createChartData(tags, expenditureLogs)
      .then(pendingChartData => {
        setData(Tag.confirmChartData(pendingChartData))
        setTagColor(Tag.extractTagColorObj(pendingChartData))
        setTotalAmount(calculateTotalAmount(pendingChartData))
      })
  }, [tags, expenditureLogs])

  return (
    <React.Fragment>
      <Chart
        width={'400px'}
        height={'360px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Total amount', 'classified by tag'],
          ...data
        ]}
        options={{
          legend: 'none',
          pieSliceText: 'label',
          title: 'Swiss Language Use (100 degree rotation)',
          pieHole: 0.4,
          pieStartAngle: 100,
          slices: {
            ...tagColor
          },
        }}
        rootProps={{ 'data-testid': '4' }}
      />

      total : <strong>{totalAmount}</strong>
    </React.Fragment>
  )
}

export default PieChart
