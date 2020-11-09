import * as React from 'react'
import { ResponsivePie } from '@nivo/pie'
import { useTypedSelector } from '../../../modules/Reducers'
import Tag from '../../../models/Tag'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


// () => <Pie {...commonProperties} colors={{ datum: 'data.color' }} />,

const Chart: React.FC = () => {
  const tags = useTypedSelector(state => state.tags)
  const expenditureLogs = useTypedSelector(state => state.expenditureLogs)

  const [data, setData] = React.useState<any>([
    {
      "id": "c",
      "label": "c",
      "value": 326,
      "color": "hsl(331, 70%, 50%)"
    }
  ])

  React.useEffect(() => {
    Tag.createChartData(tags, expenditureLogs)
      .then(chartData => {
        setData(chartData)
      })
  }, [tags])

  return (
    <div style={{width: 350, height: 330}}>
      <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.65}
          padAngle={0.7}
          cornerRadius={2}
          colors={{ scheme: 'nivo' }}
          borderWidth={2}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor={{ from: 'color' }}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          enableRadialLabels={false}
      />
    </div>
  )
}

export default Chart
