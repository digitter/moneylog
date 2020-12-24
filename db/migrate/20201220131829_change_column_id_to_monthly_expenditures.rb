class ChangeColumnIdToMonthlyExpenditures < ActiveRecord::Migration[6.0]
  def up
    change_column :monthly_expenditures, :id, :string
  end

  def down
    change_column :monthly_expenditures, :id, :integer
  end
end
