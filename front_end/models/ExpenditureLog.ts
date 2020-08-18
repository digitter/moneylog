export type expenditureLogParams = {
  title: string,
  amount: number,
  content: string,
  id?: number,
  created_at?: Date,
  updated_at?: Date
}

export default class ExpenditureLog {
  constructor(
    public title: string,
    public amount: number,
    public content: string
  ) {}

  static newInstance(params: expenditureLogParams): ExpenditureLog {
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

  static fromIncluded(jsonApiFormat: any) {
    if (!jsonApiFormat.data.relationships.expenditure_logs) { return null }

    const expenditureLogs = jsonApiFormat.included.filter(obj => {
      return obj.type === 'expenditure_log'
    })

    const expenditureLogsAttributes = expenditureLogs.map(expenditureLog => {
      return expenditureLog.attributes
    })

    return expenditureLogsAttributes
  }
}
