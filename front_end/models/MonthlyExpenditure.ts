export default class MonthlyExpenditure {
  constructor(
    public title: string,
    public amount: number,
    public content: string,
    public isActive: boolean,
    public willCreateAt: Date,
    public id?: number,
  ) {}

  // toRequest()
  // snake ケースに変換
  static serialized(params: MonthlyExpenditure) {
    const {
      title,
      amount,
      content,
      isActive: is_active,
      willCreateAt: will_create_at
    } = params

    return {
      monthly_expenditure: {
        title,
        amount,
        content,
        is_active,
        will_create_at
      }
    }
  }

  // fromResponse()
  // camel ケースに変換
  static fromJsonApi(jsonApiFormat: any): MonthlyExpenditure {
    if (jsonApiFormat.data.type !== 'monthly_expenditure') { return null }

    const {
      id,
      title,
      amount,
      content,
      is_active: isActive,
      will_create_at: willCreateAt
    } = jsonApiFormat.data.attributes

    return new MonthlyExpenditure(
      id,
      title,
      amount,
      content,
      isActive,
      willCreateAt
    )
  }

  static fromIncluded(jsonApiFormat: any):MonthlyExpenditure[] {
    if (!jsonApiFormat.data.relationships.monthly_expenditures) { return null }

    const monthlyExpenditures = jsonApiFormat.included.filter(obj => {
      return obj.type === 'monthly_expenditure'
    })

    const monthlyExpendituresAttributes = monthlyExpenditures.map(expenditureLog => {
      const {
        id,
        title,
        amount,
        content,
        is_active: isActive,
        will_create_at: willCreateAt
      } = expenditureLog.attributes

      return {
        id,
        title,
        amount,
        content,
        isActive,
        willCreateAt
      }
    })

    return monthlyExpendituresAttributes
  }
}
