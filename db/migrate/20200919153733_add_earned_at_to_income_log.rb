class AddEarnedAtToIncomeLog < ActiveRecord::Migration[6.0]
  def change
    add_column :income_logs, :earned_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }, null: false
  end
end
