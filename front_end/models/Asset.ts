export type assetParams = {
  title: string,
  amount: number,
  content: string,
  id?: number,
  created_at?: Date,
  updated_at?: Date
}

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

  static fromIncluded(jsonApiFormat: any) {
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
