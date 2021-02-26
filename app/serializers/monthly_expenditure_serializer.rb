class MonthlyExpenditureSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :amount, :content, :is_active, :will_create_at

  belongs_to :user
  has_many :expenditure_logs
end
