class Tag < ApplicationRecord
  has_many :tag_relations, dependent: :destroy
  has_many :expenditure_logs, through: :tag_relations
  has_many :income_logs, through: :tag_relations
  belongs_to :user

  def associated_with_expenditure?(log_id)
    self.expenditure_logs.exists?(id: log_id)
  end

  def associated_with_income?(log_id)
    self.income_logs.exists?(id: log_id)
  end
end
