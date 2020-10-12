class TagSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name

  has_many :tag_relations
  belongs_to :user
end
