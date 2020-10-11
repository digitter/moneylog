class ExpenditureLogSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :amount, :content, :paid_at

  has_many :tag_relations
  belongs_to :user
  belongs_to :monthly_expenditure
end
