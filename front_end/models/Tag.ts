import ExpenditureLog from "./ExpenditureLog"
import IncomeLog from "./IncomeLog"

 type chartObj = { id: number | string, name: string, description: string, color: string, value: number }
 type Log = ExpenditureLog | IncomeLog

export default class Tag {
  constructor(
    public name: string,
    public color: string,
    public description: string,
    readonly id: number,
  ) {}

  // toRequest()
  // snake ケースに変換
  static serialized(params: any) {
    const {
      id,
      name,
      color,
      description
    } = params

    return {
      tag: {
        name,
        color,
        description,
        id,
      }
    }
  }

  // fromResponse()
  // camel ケースに変換
  static fromJsonApi(jsonApiFormat: any): Tag {
    if (jsonApiFormat.data.type !== 'tag') { return null }

    const {
      name,
      color,
      description,
      id,
    } = jsonApiFormat.data.attributes

    return new Tag(
      name,
      color,
      description,
      id,
    )
  }

  static fromIncluded(jsonApiFormat: any):Tag[] {
    if (!jsonApiFormat.data.relationships.tags) { return null }

    const tags = jsonApiFormat.included.filter(obj => {
      return obj.type === 'tag'
    })

    const tagsAttributes = tags.map(tag => {
      const {
        id,
        name,
        color,
        description
      } = tag.attributes

      return {
        id,
        name,
        color,
        description
      }
    })

    return tagsAttributes
  }

  static extractIds(tags: Tag[]): number[] {
    return tags.map(tag => tag.id)
  }

  static async createChartData(tags: [], logs: []): Promise<chartObj[]> {
    // データの雛形を作成
    const chartData = tags.map((t: Tag) => Object.assign({}, t, { label: t.name}, { value: 0 }))
    // const chartData = tags.map((t: Tag) => Object.assign({}, t, { value: 0 }))
    console.log('chartData 1 >>>', chartData)

    // 各ログの金額をタグごとに分別別集計
    await Promise.all(
      logs.filter(async(l: Log) => await this.injectAmountMutably(l, chartData))
    )

    return this.confirmChartData(chartData)
  }

  private static injectAmountMutably(log: Log, chartData: any[]): Promise<chartObj[]> {
    return new Promise((resolve, reject) => {
      const calculatedData = chartData.map(d => {
        if (!log.tagIds.length) return;

        if (d.id === log.tagIds[0]) { d.value += log.amount }

        return d
      })

      resolve(calculatedData)
    })
  }

  private static confirmChartData(data): chartObj[] {
    return data.map(d => Object.assign({}, d, { id: d.name }))
  }
}
