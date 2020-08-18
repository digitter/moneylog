export default class Asset {
  constructor(
    public title: string,
    public amount: string,
    public content: string,
    public created_at: Date,
    public updated_at: Date
  ) {}

  static fromIncluded(jsonApiFormat: any) {
    if (!jsonApiFormat.data.relationships.asset) { return null }

    const assets = jsonApiFormat.included.filter(obj => {
      return obj.type === 'asset'
    })

    // [{}, {}, ...]
    const assetsAttributes = assets.map(asset => {
      return asset.attributes
    })

    return assetsAttributes[0]
  }
}
