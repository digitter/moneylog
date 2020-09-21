class CreateMonthlyExpenditures < ActiveRecord::Migration[6.0]
  def change
    create_table :monthly_expenditures do |t|
      t.string :title
      t.integer :amount
      t.text :content
      t.integer :user_id
      t.boolean :is_active
      t.datetime :will_created_at, default: -> { "CURRENT_TIMESTAMP" }, null: false

      t.timestamps
    end
  end
end
