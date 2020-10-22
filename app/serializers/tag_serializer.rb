class TagSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :color, :description

  has_many :tag_relations
  belongs_to :user
end
