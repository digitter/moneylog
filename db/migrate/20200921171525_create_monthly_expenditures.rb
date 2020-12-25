class CreateMonthlyExpenditures < ActiveRecord::Migration[6.0]
  def change
    create_table :monthly_expenditures do |t|
      t.string :title
      t.integer :amount, null: false, default: 0
      t.text :content
      t.string :user_id, null: false, index: true
      t.boolean :is_active
      t.datetime :will_create_at, default: -> { "CURRENT_TIMESTAMP" }, null: false

      t.timestamps
    end
  end
end
