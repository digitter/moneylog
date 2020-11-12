class TagSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :color, :description

  belongs_to :user
end
