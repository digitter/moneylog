class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.string :name, null: false
      t.integer :user_id, null: false
      t.integer :expenditure_log_id
      t.integer :income_log_id

      t.timestamps
    end
  end
end
