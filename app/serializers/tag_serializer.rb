class TagSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name
end
