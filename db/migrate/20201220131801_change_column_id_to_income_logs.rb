class ChangeColumnIdToIncomeLogs < ActiveRecord::Migration[6.0]
  def up
    change_column :income_logs, :id, :string
  end

  def down
    change_column :income_logs, :id, :integer
  end
end
