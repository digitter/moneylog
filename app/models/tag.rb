class Tag < ApplicationRecord
  belongs_to :user
  belongs_to :expenditure_log, optional: true
  belongs_to :income_log, optional: true
end
