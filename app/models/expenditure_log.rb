class ExpenditureLog < ApplicationRecord
  # validations
  validates :amount, presence: true
  validates :title, presence: true, length: { minimum: 1, maximum: 100 }
  validates :content, length: { maximum: 100 }

  # association
  has_many :tags
  belongs_to :user
  belongs_to :monthly_expenditure, optional: true

  # method
end
