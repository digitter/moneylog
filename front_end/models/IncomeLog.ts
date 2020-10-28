export default class IncomeLog {
  constructor(
    public title: string,
    public amount: number,
    public content: string,
    public earnedAt?: Date,
    public tagIds?: number[],
    readonly id?: number
  ) {}

  // Request
  static serialized(params: IncomeLog): IncomeLog {
    const {
      title,
      amount,
      content,
      tagIds: tag_ids,
      earnedAt: earned_at,
    } = params

   return new IncomeLog(
     title,
     amount,
     content,
     earned_at,
    tag_ids
   )
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
    return incomeLogs.map(log => log.id)
  }

  static updateUsingTagIds(log: IncomeLog, usingTagIds: number[]): IncomeLog {
    const incomeLog = Object.assign({}, log)
    incomeLog.tagIds = usingTagIds

    return incomeLog
  }

  static extractAmount(logs: IncomeLog[]): number[] {
    return logs.map(log => log.id)
  }

  static calculateAmount(logs: IncomeLog[]): number {
    const allAmount = logs.map(log => log.amount)
    return allAmount.reduce(this.reducer, 0)
  }

  static reducer = (sum: number, currentValue: number) => sum + currentValue
}
