import * as moment from 'moment'

export default class IncomeLog {
  constructor(
    public title: string,
    public amount: number,
    public content: string,
    public earnedAt: Date,
    public tagIds?: number[],
    readonly id?: number
  ) {}

  // Request
  static serialized(params: IncomeLog) {
    const {
      title,
      amount,
      content,
      earnedAt: earned_at,
    } = params

    return {
      income_log: {
       title,
       amount,
       content,
       earned_at,
      }
    }
  }

  // Response
  static fromJsonApi(jsonApiFormat: any): IncomeLog {
    if (jsonApiFormat.data.type !== 'income_log') { return null }

    const {
      id,
      title,
      amount,
      content,
      earned_at: earnedAt,
      tag_ids: tagIds,
    } = jsonApiFormat.data.attributes

    return new IncomeLog(
      title,
      amount,
      content,
      earnedAt,
      tagIds,
      id,
    )
  }

  static fromIncluded(jsonApiFormat: any):IncomeLog[] {
    if (!jsonApiFormat.data.relationships.income_logs) { return null }

    const incomeLogs = jsonApiFormat.included.filter(obj => {
      return obj.type === 'income_log'
    })

    const incomeLogsAttributes = incomeLogs.map(incomeLog => {
      const {
        id,
        title,
        amount,
        content,
        earned_at: earnedAt,
        tag_ids: tagIds
      } = incomeLog.attributes

      return {
        id,
        title,
        amount,
        content,
        earnedAt,
        tagIds
      }
    })

    return incomeLogsAttributes
  }

  static extractIds(incomeLogs: IncomeLog[]): number[] {
    return incomeLogs.map((log: IncomeLog) => log.id)
  }

  static updateUsingTagIds(log: IncomeLog, usingTagIds: number[]): IncomeLog {
    const incomeLog = Object.assign({}, log)
    incomeLog.tagIds = usingTagIds

    return incomeLog
  }

  static extractAmount(logs: IncomeLog[]): number[] {
    return logs.map((log: IncomeLog) => log.id)
  }

  static selectLogsByMonth(logs: IncomeLog[], yymm: string) {
    return logs.filter((log: IncomeLog) => {
      if (moment(log.earnedAt).format('YYYY-MM') === yymm) { return log }
    })
  }

  static calculateTotalAmount(logs: IncomeLog[]): number {
    const totalAmount = logs.map((log: IncomeLog) => log.amount)
    return totalAmount.reduce(IncomeLog.additionReducer, 0)
  }

  private static additionReducer = (accumulator: number, currentValue: number): number => accumulator + currentValue
}
