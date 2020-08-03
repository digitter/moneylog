import JSONAPISerializer from "json-api-serializer"
const Serializer = new JSONAPISerializer()

export default class User {
  constructor(
    public name: string,
    public email: string,
    public created_at: Date,
    public updated_at: Date
  ) {}

  static fromJson(jsonApiFormat: any): User {
    if (jsonApiFormat.data.type !== 'user') { return null }

    Serializer.register('user', jsonApiFormat)

    const {
      name,
      email,
      created_at,
      updated_at
    } = Serializer.deserialize('user', jsonApiFormat)

    return new User(
      name,
      email,
      created_at,
      updated_at
    )
  }
}
