class CreateMonthlyExpenditures < ActiveRecord::Migration[6.0]
  def change
    create_table :monthly_expenditures, id: false do |t|
      t.string :id, limit: 36, null: false, primary_key: true
      t.string :title
      t.integer :amount, null: false, default: 0
      t.text :content
      t.boolean :is_active
      t.datetime :will_create_at, null: false, default: -> { "CURRENT_TIMESTAMP" }
      t.string :user_id, null: false, index: true

      t.timestamps
    end
  end
end
