class AssetSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :content, :amount

  belongs_to :user
end
