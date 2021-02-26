class TagSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :color, :description

  belongs_to :user
end
