class TagRelation < ApplicationRecord
  include UuidGenerator

  belongs_to :expenditure_log, optional: true
  belongs_to :income_log, optional: true
  belongs_to :tag
end
