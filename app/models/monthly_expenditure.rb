class MonthlyExpenditure < ApplicationRecord
  # validations
  validates :amount, presence: true
  validates :title, presence: true, length: { minimum: 1, maximum: 100 }
  validates :content, length: { minimum: 1, maximum: 100 }
  validates :is_active, presence: true, inclusion: {in: [true, false]}
  validates :will_created_at, presence: true, date_time: true

  # association
  belongs_to :user
  has_many :expnediture_logs, dependent: :destroy

  # method
end
