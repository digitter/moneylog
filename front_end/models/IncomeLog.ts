export default class IncomeLog {
  constructor(
    public title: string,
    public amount: number,
    public content: string,
    public id?: number,
    public created_at?: Date,
    public updated_at?: Date
  ) {}

  static serialized(params: IncomeLog): IncomeLog {
    const {
      title,
      amount,
      content
    } = params

   return new IncomeLog(
     title,
     amount,
     content
   )
  }

  static fromJsonApi(jsonApiFormat: any): IncomeLog {
    if (jsonApiFormat.data.type !== 'income_log') { return null }

    return jsonApiFormat.data.attributes
  }

  static fromIncluded(jsonApiFormat: any):IncomeLog[] {
    if (!jsonApiFormat.data.relationships.income_logs) { return null }

    const incomeLogs = jsonApiFormat.included.filter(obj => {
      return obj.type === 'income_log'
    })

    const incomeLogsAttributes = incomeLogs.map(incomeLog => {
      return incomeLog.attributes
    })

    return incomeLogsAttributes
  }

  static extractIds(incomeLogs: IncomeLog[]): number[] {
    return incomeLogs.map(log => log.id)
  }
}
