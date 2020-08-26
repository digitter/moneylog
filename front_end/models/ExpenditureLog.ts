export default class ExpenditureLog {
  constructor(
    public title: string,
    public amount: number,
    public content: string,
    public id?: number,
    public created_at?: Date,
    public updated_at?: Date
  ) {}

  static serialized(params: ExpenditureLog): ExpenditureLog {
    const {
      title,
      amount,
      content
    } = params

   return new ExpenditureLog(
     title,
     amount,
     content
   )
  }

  static fromJsonApi(jsonApiFormat: any): ExpenditureLog {
    if (!jsonApiFormat.data.attributes) { return null }

    return jsonApiFormat.data.attributes
  }

  static fromIncluded(jsonApiFormat: any):ExpenditureLog[] {
    if (!jsonApiFormat.data.relationships.expenditure_logs) { return null }

    const expenditureLogs = jsonApiFormat.included.filter(obj => {
      return obj.type === 'expenditure_log'
    })

    const expenditureLogsAttributes = expenditureLogs.map(expenditureLog => {
      return expenditureLog.attributes
    })

    return expenditureLogsAttributes
  }

  static extractIds(expenditureLogs: ExpenditureLog[]): number[] {
    return expenditureLogs.map(log => log.id)
  }
}
