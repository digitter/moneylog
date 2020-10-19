export default class Tag {
  constructor(
    public name: string,
    public color: string,
    public description?: string,
    public id?: number,
  ) {}

  // toRequest()
  // snake ケースに変換
  static serialized(params: any) {
    const {
      id,
      name,
      color,
      description
    } = params

    return {
      tag: {
        name,
        color,
        description,
        id,
      }
    }
  }

  // fromResponse()
  // camel ケースに変換
  static fromJsonApi(jsonApiFormat: any): Tag {
    if (jsonApiFormat.data.type !== 'tag') { return null }

    const {
      name,
      color,
      description,
      id,
    } = jsonApiFormat.data.attributes

    return new Tag(
      name,
      color,
      description,
      id,
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

  static extractIds(tags: Tag[]): number[] {
    return tags.map(tag => tag.id)
  }
}
