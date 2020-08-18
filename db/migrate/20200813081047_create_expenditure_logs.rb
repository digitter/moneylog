class CreateExpenditureLogs < ActiveRecord::Migration[6.0]
  def change
    create_table :expenditure_logs do |t|
      t.integer :user_id, null: false
      t.string :title
      t.integer :amount, null: false
      t.text :content

      t.timestamps
    end
  end
end
