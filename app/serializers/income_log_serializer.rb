class IncomeLogSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :amount, :content, :earned_at

  has_many :tag_relations
  belongs_to :user
end
