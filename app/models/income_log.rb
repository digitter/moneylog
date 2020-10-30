class IncomeLog < ApplicationRecord
  # レコード保存時、カラムはデフォルトでCURRENT_TIMESTAMPになるが、
  # ActiveRecordオブジェクトには反映されないためシリアライズしてレスポンスを返す前にcallbackしている。
 after_create { self.earnedAt = created_at }

  # validations
  validates :amount, presence: true
  validates :title, presence: true, length: { minimum: 1, maximum: 100 }
  validates :content, length: { maximum: 100 }

  # associations
  has_many :tag_relations, dependent: :destroy
  has_many :tags, through: :tag_relations
  belongs_to :user

  # method
end
