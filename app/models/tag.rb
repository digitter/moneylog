class Tag < ApplicationRecord
  # create update時
  # before_save { self.color = '#' + color } // TODO: 正規表現 ?

  has_many :tag_relations, dependent: :destroy
  has_many :expenditure_logs, through: :tag_relations
  has_many :income_logs, through: :tag_relations
  belongs_to :user

  validates :name, presence: true, length: { minimum: 1, maximum: 20 }
  validates :color, presence: true
  validates :description, length: { maximum: 20 }

  def associated_with_expenditure?(log_id)
    self.expenditure_logs.exists?(id: log_id)
  end

  def associated_with_income?(log_id)
    self.income_logs.exists?(id: log_id)
  end
end
