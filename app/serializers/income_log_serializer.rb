class IncomeLogSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :amount, :content, :earned_at

  has_many :tags
  belongs_to :user
end
