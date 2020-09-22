export default class MonthlyExpenditure {
  constructor(
    public title: string,
    public amount: number,
    public content: string,
    public is_active: boolean,
    public will_create_at: Date,
    public id?: number,
  ) {}

  static serialized(params: MonthlyExpenditure): MonthlyExpenditure {
    const {
      title,
      amount,
      content,
      is_active,
      will_create_at
    } = params

   return new MonthlyExpenditure(
     title,
     amount,
     content,
     is_active,
     will_create_at
   )
  }

  static fromJsonApi(jsonApiFormat: any): MonthlyExpenditure {
    if (jsonApiFormat.data.type !== 'monthly_expenditure') { return null }

    return jsonApiFormat.data.attributes
  }

  static fromIncluded(jsonApiFormat: any):MonthlyExpenditure[] {
    if (!jsonApiFormat.data.relationships.monthly_expenditures) { return null }

    const monthlyExpenditures = jsonApiFormat.included.filter(obj => {
      return obj.type === 'monthly_expenditure'
    })

    const monthlyExpendituresAttributes = monthlyExpenditures.map(expenditureLog => {
      return expenditureLog.attributes
    })

    return monthlyExpendituresAttributes
  }
}
