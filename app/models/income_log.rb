class IncomeLog < ApplicationRecord
  # validations
  validates :amount, presence: true
  validates :title, presence: true, length: { minimum: 1, maximum: 100 }
  validates :content, length: { minimum: 1, maximum: 100 }

  # associations
  has_many :tags
  belongs_to :user

  # method
end
