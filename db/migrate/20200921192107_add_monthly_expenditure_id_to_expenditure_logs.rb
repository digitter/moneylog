class AddMonthlyExpenditureIdToExpenditureLogs < ActiveRecord::Migration[6.0]
  def change
    add_column :expenditure_logs, :monthly_expenditure, :integer
  end
end
