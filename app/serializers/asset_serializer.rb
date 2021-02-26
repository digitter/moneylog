class AssetSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :content, :amount

  belongs_to :user
end
