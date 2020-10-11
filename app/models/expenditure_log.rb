class ExpenditureLog < ApplicationRecord
  # validations
  validates :amount, presence: true
  validates :title, presence: true, length: { minimum: 1, maximum: 100 }
  validates :content, length: { maximum: 100 }

  # association
  has_many :tag_relations
  has_many :tags, through: :tag_relations
  belongs_to :user
  belongs_to :monthly_expenditure, optional: true

  # method
end
