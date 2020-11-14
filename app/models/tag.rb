class Tag < ApplicationRecord
  # create update時
  # before_save { self.color = '#' + color } // TODO: 正規表現 ?

  has_many :tag_relations, dependent: :delete_all
  has_many :expenditure_logs, through: :tag_relations
  has_many :income_logs, through: :tag_relations
  belongs_to :user

  validates :name, presence: true, length: { minimum: 1, maximum: 20 }
  validates :color, presence: true
  validates :description, length: { maximum: 20 }

end
