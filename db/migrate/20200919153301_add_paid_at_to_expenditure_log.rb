class AddPaidAtToExpenditureLog < ActiveRecord::Migration[6.0]
  def change
    add_column :expenditure_logs, :paid_at, :datetime, default: -> { 'CURRENT_TIMESTAMP' }, null: false
  end
end
