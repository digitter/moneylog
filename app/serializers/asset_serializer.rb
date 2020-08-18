class AssetSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :content, :amount

  belongs_to :user
end
