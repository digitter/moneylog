class MonthlyExpenditure < ApplicationRecord
  # validations
  validates :amount, presence: true
  validates :title, presence: true, length: { minimum: 1, maximum: 100 }
  validates :content, length: { maximum: 100 }
  validates :is_active, inclusion: {in: [true, false]}

  # association
  belongs_to :user
  has_many :expenditure_logs

  # method
end
