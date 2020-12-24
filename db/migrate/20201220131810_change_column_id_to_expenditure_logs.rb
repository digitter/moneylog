class ChangeColumnIdToExpenditureLogs < ActiveRecord::Migration[6.0]
  def up
    change_column :expenditure_logs, :id, :string
  end

  def down
    change_column :expenditure_logs, :id, :integer
  end
end
