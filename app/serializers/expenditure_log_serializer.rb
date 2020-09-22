class ExpenditureLogSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :amount, :content, :created_at, :updated_at

  belongs_to :user
  belongs_to :monthly_expenditure
end
