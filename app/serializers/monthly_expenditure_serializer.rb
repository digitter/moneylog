class MonthlyExpenditureSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :amount, :content, :is_active, :will_created_at

  belongs_to :user
  has_many :expenditure_logs
end
