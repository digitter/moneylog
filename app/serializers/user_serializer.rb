class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :email, :created_at, :updated_at

  has_one :asset
  has_many :expenditure_logs
  has_many :income_logs
  has_many :monthly_expenditures
end
