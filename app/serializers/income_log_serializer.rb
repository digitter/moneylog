class IncomeLogSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :amount, :content, :earned_at

  # custom attributes
  # フロント側で、収入ログに紐づくタグのidを全て保持させておく
  attributes :tag_id do |object|
    object.tag.id
  end

  has_one :tag_relation
  belongs_to :user
end
