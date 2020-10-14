export default class Tag {
  constructor(
    public name: string,
    public color: string,
    public description: string,
    public id?: number,
  ) {}

  // toRequest()
  // snake ケースに変換
  static serialized(params: Tag) {
    const {
      id,
      name,
      color,
      description
    } = params

    return {
      tag: {
        id,
        name,
        color,
        description
      }
    }
  }

  // fromResponse()
  // camel ケースに変換
  static fromJsonApi(jsonApiFormat: any): Tag {
    if (jsonApiFormat.data.type !== 'tag') { return null }

    const {
      id,
      name,
      color,
      description
    } = jsonApiFormat.data.attributes

    return new Tag(
      id,
      name,
      color,
      description
    )
  }

  static fromIncluded(jsonApiFormat: any):Tag[] {
    if (!jsonApiFormat.data.relationships.tags) { return null }

    const tags = jsonApiFormat.included.filter(obj => {
      return obj.type === 'tag'
    })

    const tagsAttributes = tags.map(tag => {
      const {
        id,
        name,
        color,
        description
      } = tag.attributes

      return {
        id,
        name,
        color,
        description
      }
    })

    return tagsAttributes
  }
}
