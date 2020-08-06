class AssetSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :content

  belongs_to :user
end
