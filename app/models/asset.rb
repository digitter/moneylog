class Asset < ApplicationRecord
  # validation
  validates :title, presence: true
  validates :amount, presence: true
  validates :content, length: { maximum: 100 }

  # association
  belongs_to :user

  # method
end
