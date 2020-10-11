class TagRelation < ApplicationRecord
  belongs_to :expenditure_log, optional: true
  belongs_to :income_log, optional: true
  belongs_to :tag
end
