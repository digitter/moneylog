class ExpenditureLog < ApplicationRecord
  # レコード保存時、カラムはデフォルトでCURRENT_TIMESTAMPになるが、
  # ActiveRecordオブジェクトには反映されないためシリアライズしてレスポンスを返す前にcallbackしている。
  after_create { self.paid_at = created_at }

  # validations
  validates :amount, presence: true
  validates :title, presence: true, length: { minimum: 1, maximum: 100 }
  validates :content, length: { maximum: 100 }

  # association
  has_many :tag_relations, dependent: :destroy
  has_many :tags, through: :tag_relations
  belongs_to :user
  belongs_to :monthly_expenditure, optional: true

  # method
end
