class Tag < ApplicationRecord
  has_many :tag_relations
  belongs_to :user

  def associated_with?(log)
    if log.class == ExpenditureLog
      self.tag_relations.exists?(expenditure_log_id: log.id)
    elsif log.class == IncomeLog
      self.tag_relations.exists?(income_log_id: log.id)
    end
  end
end
