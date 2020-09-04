class ExpenditureLog < ApplicationRecord
  # validations
  validates :amount, presence: true
  validates :title, presence: true, length: { minimum: 1, maximum: 100 }
  validates :content, length: { minimum: 1, maximum: 100 }

  # association
  belongs_to :user

  # method
end
