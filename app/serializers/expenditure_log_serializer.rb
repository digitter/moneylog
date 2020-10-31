class ExpenditureLogSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :amount, :content, :paid_at

  # custom attributes
  # フロント側で、支出ログに紐づくタグのidを保持させておく
  attributes :tag_id do |object|
    object.tag.id
  end

  has_one :tag_relation
  belongs_to :user
  belongs_to :monthly_expenditure
end
