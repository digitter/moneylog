class MonthlyExpenditure < ApplicationRecord
  # validations
  validates :amount, presence: true
  validates :title, presence: true, length: { minimum: 1, maximum: 100 }
  validates :content, length: { minimum: 1, maximum: 100 }
  validates :is_active, presence: true, inclusion: {in: [true, false]}
  validates :will_create_at, presence: true

  # association
  belongs_to :user
  has_many :expnediture_logs

  # method
end
