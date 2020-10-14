class ExpenditureLogSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :amount, :content, :paid_at

  # custom attributes
  # フロント側で、支出ログに紐づくタグのidを全て保持させておく
  attributes :tag_ids do |object|
    object.tags.pluck(:id)
  end

  has_many :tag_relations
  belongs_to :user
  belongs_to :monthly_expenditure
end
