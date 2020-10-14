export default class ExpenditureLog {
  constructor(
    public title: string,
    public amount: number,
    public content: string,
    public paidAt?: Date,
    public tagIds?: number[],
    readonly id?: number,
  ) {}

  // Request
  // snake ケースに変換
  static serialized(params: ExpenditureLog): ExpenditureLog {
    const {
      title,
      amount,
      content,
      tagIds: tag_ids,
      paidAt: paid_at
    } = params

   return new ExpenditureLog(
     title,
     amount,
     content,
     paid_at,
     tag_ids
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
      tag_ids: tagIds
    } = jsonApiFormat.data.attributes

    return new ExpenditureLog(
      title,
      amount,
      content,
      paidAt,
      tagIds,
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
        paid_at: paidAt,
        tag_ids: tagIds
      } = expenditureLog.attributes

      return {
        id,
        title,
        amount,
        content,
        paidAt,
        tagIds
      }
    })

    return expenditureLogsAttributes
  }

  static extractIds(expenditureLogs: ExpenditureLog[]): number[] {
    return expenditureLogs.map(log => log.id)
  }
}
