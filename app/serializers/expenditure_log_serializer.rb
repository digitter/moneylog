class ExpenditureLogSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :amount, :content, :paid_at

  # custom attributes
  # フロント側で、支出ログに紐づくタグのidを全て保持させておく
  attributes :tag_ids do |object|
    object.tags.ids
  end

  belongs_to :user
  belongs_to :monthly_expenditure
end
