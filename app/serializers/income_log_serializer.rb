class IncomeLogSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :amount, :content, :earned_at

  # custom attributes
  # フロント側で、収入ログに紐づくタグのidを全て保持させておく
  attributes :tag_ids do |object|
    object.tags.pluck(:id)
  end

  has_many :tag_relations
  belongs_to :user
end
