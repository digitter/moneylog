export default class IncomeLog {
  constructor(
    public title: string,
    public amount: number,
    public content: string,
    public earnedAt?: Date,
    readonly id?: number,
    public created_at?: Date,
    public updated_at?: Date
  ) {}

  // Request
  static serialized(params: IncomeLog): IncomeLog {
    const {
      title,
      amount,
      content,
      earnedAt: earned_at,
    } = params

   return new IncomeLog(
     title,
     amount,
     content,
     earned_at
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
      earned_at: earnedAt
    } = jsonApiFormat.data.attributes

    return new IncomeLog(
      title,
      amount,
      content,
      earnedAt,
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
        earned_at: earnedAt
      } = incomeLog.attributes

      return {
        id,
        title,
        amount,
        content,
        earnedAt
      }
    })

    return incomeLogsAttributes
  }

  static extractIds(incomeLogs: IncomeLog[]): number[] {
    return incomeLogs.map(log => log.id)
  }
}
