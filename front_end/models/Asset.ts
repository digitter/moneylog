export default class Asset {
  constructor(
    public title: string,
    public amount: number,
    public content: string,
    public id?: number,
    public created_at?: Date,
    public updated_at?: Date,
  ) {}

  static newInstance(params: Asset): Asset {
    const {
      title,
      amount,
      content
    } = params

    return new Asset(
      title,
      amount,
      content
    )
  }

  static fromSerialized(jsonApiFormat: any): Asset[] {
    if (jsonApiFormat.data.type !== 'asset') return null;
    return [jsonApiFormat.data.attributes]
  }

  static fromIncluded(jsonApiFormat: any): Asset[] {
    if (!jsonApiFormat.data.relationships.asset) { return null }

    const assets = jsonApiFormat.included.filter(obj => {
      return obj.type === 'asset'
    })

    const assetsAttributes = assets.map(asset => {
      return asset.attributes
    })

    return assetsAttributes
  }
}
