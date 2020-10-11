class Tag < ApplicationRecord
  has_many :tag_relations
  belongs_to :user
end
