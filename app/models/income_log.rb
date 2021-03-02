class IncomeLog < ApplicationRecord
  include UuidGenerator

  # レコード保存時、カラムはデフォルトでCURRENT_TIMESTAMPになるが、
  # ActiveRecordオブジェクトには反映されないためシリアライズしてレスポンスを返す前にcallbackしている。
  after_create { self.earned_at = created_at }

  # validations
  validates :amount, presence: true
  validates :title, presence: true, length: { minimum: 1, maximum: 100 }
  validates :content, length: { maximum: 100 }

  # associations
  has_many :tag_relations, dependent: :destroy
  has_many :tags, through: :tag_relations
  belongs_to :user

  # method
  scope :this_month, -> { where(earned_at: Time.current.all_month) }
end
