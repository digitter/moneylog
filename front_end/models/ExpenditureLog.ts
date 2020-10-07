export default class ExpenditureLog {
  constructor(
    public title: string,
    public amount: number,
    public content: string,
    public paidAt?: Date,
    readonly id?: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  // Request
  // snake ケースに変換
  static serialized(params: ExpenditureLog): ExpenditureLog {
    const {
      title,
      amount,
      content,
      paidAt: paid_at
    } = params

   return new ExpenditureLog(
     title,
     amount,
     content,
     paid_at
   )
  }

  // Response
  // camel ケースに変換
  static fromJsonApi(jsonApiFormat: any): ExpenditureLog {
    if (jsonApiFormat.data.type !== 'expenditure_log') { return null }

    const {
      id,
      title,
      amount,
      content,
      paid_at: paidAt,
    } = jsonApiFormat.data.attributes

    return new ExpenditureLog(
      title,
      amount,
      content,
      paidAt,
      id
    )
  }

  static fromIncluded(jsonApiFormat: any):ExpenditureLog[] {
    if (!jsonApiFormat.data.relationships.expenditure_logs) { return null }

    const expenditureLogs = jsonApiFormat.included.filter(obj => {
      return obj.type === 'expenditure_log'
    })

    const expenditureLogsAttributes = expenditureLogs.map(expenditureLog => {
      const {
        id,
        title,
        amount,
        content,
        paid_at: paidAt
      } = expenditureLog.attributes

      return {
        id,
        title,
        amount,
        content,
        paidAt
      }
    })

    return expenditureLogsAttributes
  }

  static extractIds(expenditureLogs: ExpenditureLog[]): number[] {
    return expenditureLogs.map(log => log.id)
  }
}
