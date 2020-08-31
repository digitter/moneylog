class CreateIncomeLogs < ActiveRecord::Migration[6.0]
  def change
    create_table :income_logs do |t|
      t.integer :user_id, null: false
      t.integer :amount, null: false
      t.string :title
      t.text :content

      t.timestamps
    end
  end
end