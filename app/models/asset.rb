class Asset < ApplicationRecord
  include UuidGenerator

  # validation
  validates :title, length: { maximum: 50 }
  validates :content, length: { maximum: 100 }
  validates :amount, presence: true, numericality: { only_integer: true, less_than_or_equal_to: 1000000 }

  # association
  belongs_to :user

  # method
end
