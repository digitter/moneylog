export default class User {
  constructor(
    public name: string,
    public email: string,
    public created_at?: Date,
    public updated_at?: Date
  ) {}

  static serialized(params: User): User {
    const {
      name,
      email,
    } = params

    return new User(
      name,
      email,
    )
  }

  static fromJsonApi(jsonApiFormat: any): User {
    if (jsonApiFormat.data.type !== 'user') { return null }

    return jsonApiFormat.data.attributes
  }
}
