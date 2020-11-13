import ExpenditureLog from "./ExpenditureLog"
import IncomeLog from "./IncomeLog"

export type pendingChartData = {
  id: number,
  name: string,
  description: string,
  color: string,
  totalAmount: number
}

type Log = ExpenditureLog | IncomeLog

export default class Tag {
  constructor(
    public name: string,
    public color: string,
    public description: string,
    readonly id: number,
  ) {}

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
  static fromJsonApi(jsonApiFormat: any): Tag {
    if (jsonApiFormat.data.type !== 'tag') { return null }

    return jsonApiFormat.data.attributes
  }

  static fromIncluded(jsonApiFormat: any):Tag[] {
    if (!jsonApiFormat.data.relationships.tags) { return null }

    const tags = jsonApiFormat.included.filter(obj => {
      return obj.type === 'tag'
    })

    const tagsAttributes = tags.map(tag => tag.attributes)

    return tagsAttributes
  }

  static extractIds(tags: Tag[]): number[] {
    return tags.map(tag => tag.id)
  }

  static async createChartData(tags: Tag[], logs: Log[]): Promise<pendingChartData[]> {
    // データの雛形を作成
    const data = tags.map((t: Tag) => Object.assign({}, t, { totalAmount: 0 }))

    // 各ログの金額をタグごとに分別別集計
    await Promise.all(
      logs.map(async(l: Log) => await this.injectAmountMutably(l, data))
    )

    return data
  }

  private static injectAmountMutably(log: Log, chartData: pendingChartData[]): Promise<void> {
    return new Promise((resolve, reject) => {
      chartData.forEach(d => {
        if (!log.tagIds.length) { return }
        if (d.id === log.tagIds[0]) { d.totalAmount += log.amount }
      })

      resolve()
    })
  }

  static confirmChartData(data: pendingChartData[]): Array<[string, number]> {
    return data.map((d: pendingChartData) => [d.name, d.totalAmount])
  }

  static extractTagColorObj(data: pendingChartData[]): Array<{color: string}> {
    return data.map(d => ({ color: d.color }))
  }
}
