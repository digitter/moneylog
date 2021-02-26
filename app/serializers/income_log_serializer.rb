class IncomeLogSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :amount, :content, :earned_at

  # custom attributes
  # フロント側で、収入ログに紐づくタグのidを全て保持させておく
  attributes :tag_ids do |object|
    object.tags.ids
  end

  belongs_to :user
end
