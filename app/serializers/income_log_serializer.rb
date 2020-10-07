class IncomeLogSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :amount, :content, :created_at, :updated_at, :earned_at

  belongs_to :user
end
