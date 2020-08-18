class AddDefaultOptionToExpenditureLogAmount < ActiveRecord::Migration[6.0]
  def up
    change_column :expenditure_logs, :amount, :integer, null: false, :default => 0
  end

  def down
    change_column :expenditure_logs, :amount, :integer, null: false
  end
end
