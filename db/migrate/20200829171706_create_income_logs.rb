class CreateIncomeLogs < ActiveRecord::Migration[6.0]
  def change
    create_table :income_logs do |t|
      t.string :user_id, null: false, index: true
      t.integer :amount, null: false
      t.string :title
      t.text :content

      t.timestamps
    end
  end
end
